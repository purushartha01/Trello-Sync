const path = require("path");
const fs = require("fs");


const CURR_STORE_PATH = path.join(process.cwd(), "data_store", "currentWebhooks.json");

const ensureWebhookStoreExists = () => {
    const dir = path.dirname(CURR_STORE_PATH);

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(CURR_STORE_PATH)) {
        fs.writeFileSync(CURR_STORE_PATH, JSON.stringify({
            hooks: []
        }, null, 2));
    }
}

const readWebhookStore = () => {
    ensureWebhookStoreExists();
    const data = fs.readFileSync(CURR_STORE_PATH, "utf-8");
    return JSON.parse(data);
}

const writeToWebhookStore = (data) => {
    ensureWebhookStoreExists();
    console.log("Writing to webhook store: ", data);
    fs.writeFileSync(CURR_STORE_PATH, JSON.stringify(data));
}

const addWebhookToStore = ({ boardId, webhookId, callbackURL, description }) => {
    const store = readWebhookStore();
    
    if (!boardId || !webhookId || !callbackURL) {
        return false;
    }
    if (store.hooks.filter((h) => h.boardId === boardId).length > 0) {
        return false;
    }
    console.log("Updated webhook store: ", store);
    store.hooks.push({ boardId, id: webhookId, callbackURL, description, createdAt: new Date().toISOString() });

    writeToWebhookStore(store);
    return true;
}

const removeWebhookFromStore = (boardId) => {
    const store = readWebhookStore();
    const filteredHooks = store.hooks.filter((h) => h.boardId !== boardId);
    store.hooks = filteredHooks;
    writeToWebhookStore(store);
}

const removeAllWebhooksFromStore = () => {
    const store = readWebhookStore();
    store.hooks = [];
    writeToWebhookStore(store);
}

const getAllWebhooks = () => {
    const store = readWebhookStore();
    // console.log("Getting all webhooks from store: ", store);

    return store.hooks;
}

// Working correctly
const getWebhookByBoardId = (boardId) => {
    const store = readWebhookStore();
    const foundHook = store.hooks.filter((h) => h.boardId === boardId)
    return foundHook;
}

module.exports = {
    addWebhookToStore,
    removeWebhookFromStore,
    removeAllWebhooksFromStore,
    getAllWebhooks,
    getWebhookByBoardId
}