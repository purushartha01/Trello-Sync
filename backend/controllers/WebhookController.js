const { Atlassian_API_Key, callbackUrl, Atlassian_Secret_Key, TrelloAPIToken } = require('../config/serverConfig');
const { getBoards, fetchAllWebhooks, createWebhook, deleteWebhook, mapTrelloActionToSocket } = require('../services/trelloWebhookService');
const { getIO } = require('../socket');
const store = require('./../storage/webhookStore');
const crypto = require('crypto');


const recentActionsId = new Set();
const DEDUPLICATE_TTL_MS = 60 * 1000; // 60 seconds

const scheduleActionCleanup = (actionId) => {
    setInterval(() => recentActionsId.delete(actionId), DEDUPLICATE_TTL_MS);
}

const setupWebhooks = async (req, res, next) => {
    try {

        if (!Atlassian_API_Key || !Atlassian_Secret_Key || !TrelloAPIToken) {
            return res.status(500).json({ error: "Missing API keys or tokens" });
        }
        const boards = await getBoards("&fields=all");

        const existingWebhooks = await fetchAllWebhooks();

        const createdWebhooks = [];
        for (const board of boards) {
            const currentlyStoredWebhooks = store.getWebhookByBoardId(board.id);
            // console.log("Currently stored webhooks for board ", board.id, ": ", currentlyStoredWebhooks);

            if (currentlyStoredWebhooks.length > 0) {
                continue;
            }

            const doesExistOnTrello = existingWebhooks.filter(wh => wh.idModel === board.id && wh.callbackUrl === callbackUrl);
            // console.log("Existing webhooks on Trello for board ", board.id, ": ", doesExistOnTrello);
            if (doesExistOnTrello && doesExistOnTrello.length > 0) {
                store.addWebhookToStore({
                    boardId: board.id,
                    webhookId: doesExistOnTrello.id,
                    callbackURL: doesExistOnTrello.callbackUrl,
                    description: doesExistOnTrello.description
                });
                continue;
            }

            const newWebhook = await createWebhook({
                description: `Webhook for board ${board.name}`,
                idModel: board.id
            });
            // console.log("Created new webhook: ", newWebhook);


            store.addWebhookToStore({
                boardId: board.id,
                webhookId: newWebhook.id,
                callbackURL: newWebhook.callbackURL,
                description: newWebhook.description
            });

            createdWebhooks.push({
                boardId: board.id,
                webhookId: newWebhook.id,
                callbackURL: newWebhook.callbackURL,
                description: newWebhook.description
            });
        }

        res.status(200).json({ ok: true, createdWebhooks, stored: store.getAllWebhooks() });

    } catch (err) {
        console.log(err);
        next(err);
    }
}

const handleWebhookCallback = (req, res, next) => {
    res.status(200).send();
}

const handleWebhookEvent = (req, res, next) => {
    try {
        const rawBody = req.body;
        const signature = req.get("X-Trello-Webhook") || req.get("x-trello-webhook");

        console.log("Received Trello webhook event", rawBody);

        if (!signature) {
            console.log("Missing Trello webhook signature");
            res.locals.statusCode = 400;
            throw new Error("Missing Trello webhook signature.");
        }

        const hmac = crypto.createHmac("sha1", Atlassian_Secret_Key);
        // if validation of expected signature===signature fails try parsing the raw body as string
        hmac.update(JSON.stringify(rawBody));
        hmac.update(callbackUrl);

        const expectedSignature = hmac.digest("base64");

        if (expectedSignature !== signature) {
            console.log("Invalid Trello webhook signature");
            res.locals.statusCode = 401;
            throw new Error("Invalid Trello webhook signature.");
        }

        const payload = JSON.parse(JSON.stringify(rawBody));

        const actionId = payload?.action?.id;
        if (actionId) {
            if (recentActionsId.has(actionId)) {
                return res.status(200).send();
            } else {
                recentActionsId.add(actionId);
                scheduleActionCleanup(actionId);
            }
        }
        try {
            const io = getIO();
            console.log("Emitting webhook event via socket:", { action: payload.action, model: payload.model });
            io.emit("trello:webhookEvent", { action: payload.action, model: payload.model });
        } catch (err) {
            console.log("Error emitting webhook event via socket:", err);
        }

        return res.status(200).send();
    } catch (err) {
        next(err);
    }
}

const deleteAllWebhooks = async (req, res, next) => {
    try {
        const allWebhooks = await fetchAllWebhooks();
        if (allWebhooks && allWebhooks.length > 0) {
            for (const webhook of allWebhooks) {
                console.log("Deleting webhook: ", webhook);
                try {
                    await deleteWebhook(webhook.id);
                } catch (err) {
                    throw new Error(`Failed to delete webhook ${webhook.id}: ${err.message}`);
                }
            }

        }
        store.removeAllWebhooksFromStore();
        res.status(200).json({ ok: true, message: "All webhooks deleted" });
    } catch (err) {
        next(err);
    }
}

const listAllWebhooks = (req, res, next) => {
    try {
        res.status(200).json({ ok: true, webhooks: store.getAllWebhooks() });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    setupWebhooks,
    handleWebhookEvent,
    deleteAllWebhooks,
    listAllWebhooks,
    handleWebhookCallback,
}