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
    const result = await response.json();
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

    if (response.status === 404) {
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

// trelloEventMapper.js
// const mapTrelloActionToSocket = (io, action) => {
//     const { type, data } = action;

//     console.log("Mapping Trello action to socket event:", action);

//     switch (type) {
//         // Card Created
//         case "createCard":
//             io.emit("card:created", {
//                 card: data.card,
//                 listId: data.list?.id,
//                 boardId: data.board?.id
//             });
//             break;

//         // Card Updated (Title, Desc, Due, Position)
//         case "updateCard":
//             // Moved between lists
//             if (data.listBefore && data.listAfter) {
//                 io.emit("card:moved", {
//                     cardId: data.card.id,
//                     fromList: data.listBefore.id,
//                     toList: data.listAfter.id
//                 });
//                 break;
//             }

//             // Archived or Unarchived
//             if (data.old?.closed !== undefined) {
//                 io.emit("card:archived", {
//                     cardId: data.card.id,
//                     isArchived: data.card.closed
//                 });
//                 break;
//             }

//             // General update (title, desc, etc.)
//             io.emit("card:updated", {
//                 card: data.card
//             });
//             break;

//         // Card Deleted
//         case "deleteCard":
//             io.emit("card:deleted", {
//                 cardId: data.card.id
//             });
//             break;

//         // List Created
//         case "createList":
//             io.emit("list:created", {
//                 list: data.list,
//                 boardId: data.board?.id
//             });
//             break;

//         // List Renamed
//         case "updateList":
//             // Only keep name change logic
//             if (data.old?.name !== undefined) {
//                 io.emit("list:updated", {
//                     listId: data.list.id,
//                     name: data.list.name
//                 });
//             }
//             break;
//         default:
//             io.emit("trello:webhookEvent", { action, model: action.model });
//             break;
//     }
// }

module.exports = {
    getBoards,
    createWebhook,
    deleteWebhook,
    fetchAllWebhooks,
    // mapTrelloActionToSocket
}