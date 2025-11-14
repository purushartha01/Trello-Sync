const { TrelloAPIToken, callbackUrl, Atlassian_API_Key } = require('./../config/serverConfig');


const base_url = "https://api.trello.com/1/webhooks/";

const processRequestResponse = async (url, options) => {
    const response = await fetch(url, options);
    // console.log("Trello API Response: ", response);
    return response;
}


const getBoards = async (authParams) => {
    const url = `https://api.trello.com/1/members/me/boards?key=${Atlassian_API_Key}&token=${TrelloAPIToken}${authParams}`;
    console.log("Fetching boards from URL:", url);
    const response = await processRequestResponse(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });

    if (!response.status.toString().startsWith('2')) {
        throw new Error(`Failed to fetch boards from Trello. Status: ${response.status}`);
    }
    const result= await response.json();
    return result;
}

const createWebhook = async ({ description, idModel }) => {
    const url = `${base_url}?callbackURL=${callbackUrl}&idModel=${idModel}&description=${description}&key=${Atlassian_API_Key}&token=${TrelloAPIToken}`;
    const response = await processRequestResponse(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    // console.log("Create webhook response status: ", response);
    if (!response.status.toString().startsWith('2')) {
        throw new Error(`Failed to create webhook on Trello. Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
}

// TODO: Ensure webhookId is present else breaking error thrown
const deleteWebhook = async (webhookId) => {
    const url = `${base_url}${webhookId}?key=${Atlassian_API_Key}&token=${TrelloAPIToken}`;
    const response = await processRequestResponse(url, {
        method: 'DELETE'
    });

    if(response.status === 404) {
        console.log(`Webhook with ID ${webhookId} not found on Trello. It might have been already deleted.`);
        return [];
    }

    if (!response.status.toString().startsWith('2')) {
        throw new Error(`Failed to delete webhook on Trello. Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
}


const fetchAllWebhooks = async () => {
    const url = `https://api.trello.com/1/tokens/${TrelloAPIToken}/webhooks?key=${Atlassian_API_Key}&token=${TrelloAPIToken}`;
    const response = await processRequestResponse(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    // console.log("Fetch all webhooks response status: ", response);
    if (!response.status.toString().startsWith('2')) {
        throw new Error(`Failed to fetch webhooks from Trello. Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
}

module.exports = {
    getBoards,
    createWebhook,
    deleteWebhook,
    fetchAllWebhooks
}