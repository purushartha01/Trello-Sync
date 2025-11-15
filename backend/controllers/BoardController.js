const { Atlassian_API_Key, TrelloAPIToken } = require("../config/serverConfig");

// Creating a new board on Trello
const createBoard = async (req, res, next) => {
    try {
        const { name, defaultLists, desc } = req.body;
        const response = await fetch(`https://api.trello.com/1/boards/?name=${name}&key=${Atlassian_API_Key}&token=${TrelloAPIToken}&defaultLists=${defaultLists}&desc=${desc}`, {
            method: 'POST'
        });

        if (response.status !== 200) {
            res.locals.statusCode = response.status;
            throw new Error("Failed to create board on Trello");
        }
        const result = await response.json();

        res.status(201).json({ result: result });

    } catch (err) {
        next(err);
    }
}

// Fetching all boards from Trello
const fetchBoards = async (req, res, next) => {
    try {
        const response = await fetch(`https://api.trello.com/1/members/me/boards?key=${Atlassian_API_Key}&token=${TrelloAPIToken}&fields=id,id,name,url,desc,descData,closed,pinned,memberships,dateClosed,starred,prefs&lists=all`, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (response.status !== 200) {
            res.locals.statusCode = response.status;
            throw new Error("Failed to fetch boards from Trello");
        }
        const result = await response.json();
        // console.log(result);

        res.status(200).json({ userBoards: result });
    } catch (err) {
        next(err);
    }
}

const fetchBoardById = async (req, res, next) => {
    try {
        const { boardId } = req.params;
        const response = await fetch(`https://api.trello.com/1/boards/${boardId}?key=${Atlassian_API_Key}&token=${TrelloAPIToken}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (response.status !== 200) {
            res.locals.statusCode = response.status;
            throw new Error("Failed to fetch board from Trello");
        }

        const result = await response.json();
        res.status(200).json({ result: result });

    } catch (err) {
        next(err);
    }
}

const createList = async (req, res, next) => {
    try {
        const { boardId, name } = req.body;
        const response = await fetch(`https://api.trello.com/1/boards/${boardId}/lists?name=${name}&key=${Atlassian_API_Key}&token=${TrelloAPIToken}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.status !== 200) {
            res.locals.statusCode = response.status;
            throw new Error("Failed to create list on Trello");
        }
        const result = await response.json();
        res.status(201).json({ result: result });
    } catch (err) {
        next(err);
    }
}

// Getting all tasks(Cards) from a Trello board List
const getTaskCards = async (req, res, next) => {
    try {
        const { listId } = req.params;
        const response = await fetch(`https://api.trello.com/1/lists/${listId}/cards?key=${Atlassian_API_Key}&token=${TrelloAPIToken}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log("Fetching cards for list ID:", listId);

        // console.log("Fetching cards for list ID:", response);

        if (response.status !== 200) {
            res.locals.statusCode = response.status;
            throw new Error("Failed to fetch task cards from Trello");
        }

        const result = await response.json();
        res.status(200).json({ result: result });

    } catch (err) {
        next(err);
    }
}

// Adding a new task(Card in List) to a Trello board
const addTask = async (req, res, next) => {
    try {
        const { listId, name, desc } = req.body;
        const response = await fetch(`https://api.trello.com/1/cards?idList=${listId}&key=${Atlassian_API_Key}&token=${TrelloAPIToken}&name=${name}&desc=${desc}`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            res.locals.statusCode = response.status;
            throw new Error("Failed to add task to Trello");
        }

        const result = await response.json();
        res.status(201).json({ result: result });

    } catch (err) {
        next(err);
    }
}

// Updating a task(Card) on Trello board List
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const response = await fetch(`https://api.trello.com/1/cards/${id}?key=${Atlassian_API_Key}&token=${TrelloAPIToken}&name=${name}`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log("Response: ", response);
        if (response.status !== 200) {
            res.locals.statusCode = response.status;
            throw new Error("Failed to update task on Trello");
        }

        const result = await response.json();
        res.status(200).json({ result: result });

    } catch (err) {
        next(err);
    }
}


// Deleting a task(Card) from Trello board List
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await fetch(`https://api.trello.com/1/cards/${id}?key=${Atlassian_API_Key}&token=${TrelloAPIToken}`, {
            method: 'DELETE'
        });
        if (response.status !== 200) {
            res.locals.statusCode = response.status;
            throw new Error("Failed to delete task from Trello");
        }

        res.status(200).json({ message: "Task deleted successfully" });

    } catch (err) {
        next(err);
    }
}

const markTaskComplete = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const { dueComplete } = req.body;
        console.log("Marking task complete called for task ID:", taskId, "with dueComplete:", Atlassian_API_Key, TrelloAPIToken);

        const getDueResponse = await fetch(`https://api.trello.com/1/cards/${taskId}?key=${Atlassian_API_Key}&token=${TrelloAPIToken}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        console.log("Fetched task details for marking complete:", getDueResponse);

        if (getDueResponse.status !== 200) {
            res.locals.statusCode = getDueResponse.status;
            throw new Error("Failed to fetch task details from Trello");
        }
        const taskDetails = await getDueResponse.json();

        if (!taskDetails.due) {
            const updatedDueResponse = await fetch(`https://api.trello.com/1/cards/${taskId}?key=${Atlassian_API_Key}&token=${TrelloAPIToken}&due=${Date.now().toString()}`, {
                method: 'PUT',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (updatedDueResponse.status !== 200) {
                res.locals.statusCode = updatedDueResponse.status;
                throw new Error("Failed to update due date for marking task as complete on Trello");
            }
        }

        const response = await fetch(`https://api.trello.com/1/cards/${taskId}?key=${Atlassian_API_Key}&token=${TrelloAPIToken}&dueComplete=${dueComplete}`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (response.status !== 200) {
            res.locals.statusCode = response.status;
            throw new Error("Failed to mark task as complete on Trello");
        }
        const result = await response.json();
        res.status(200).json({ result: result });
    } catch (err) {
        next(err);
    }
}


module.exports = {
    createBoard,
    fetchBoards,
    fetchBoardById,
    createList,
    addTask,
    updateTask,
    deleteTask,
    getTaskCards,
    markTaskComplete,
}