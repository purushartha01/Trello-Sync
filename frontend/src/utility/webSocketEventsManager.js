import { serverAxiosInstance } from "./axiosConfig";


const handleBoardLevelEvents = (eventName, oldboards, newData) => {
    switch (eventName) {
        // Works correctly
        case "updateBoard": {
            const updatedBoards = oldboards.map((board) => {
                if (board.id === newData.id) {
                    return { ...board, ...newData };
                }
                return board;
            });
            return updatedBoards;
        }
        default: {
            console.log("Unhandled board level event:", eventName);
            return;
        }
    }
}

const handleListLevelEvents = (eventName, boards, { boardId, newList }) => {
    console.log("Handling list level event:", eventName, boards, boardId, newList);
    switch (eventName) {
        // Works correctly
        case "createList": {
            const updatedBoards = boards.map((b) => {
                if (b.id === boardId) {
                    return { ...b, lists: [...b.lists, newList] };
                }
                return b;
            });
            return updatedBoards;
        }
        // Works correctly
        case "updateList": {
            const updatedBoards = boards.map((b) => {
                if (b.id === boardId) {
                    return {
                        ...b,
                        lists: b.lists.map((list) => {
                            if (list.id === newList.id) {
                                return { ...list, ...newList };
                            }
                            return list;
                        })
                    }
                }
                return b;
            });
            return updatedBoards;
        }
        // Works correctly
        case "deleteList": {
            const updatedBoards = boards.map((b) => {
                if (b.id === boardId) {
                    return {
                        ...b,
                        lists: b.lists.filter((list) => list.id !== newList.id)
                    }
                }
                return b;
            });
            return updatedBoards;
        }
        default: {
            console.log("Unhandled list level event:", eventName);
            return
        }
    }
}

const handleCardLevelEvents = (eventName, oldCards, { boardId, listId, card }) => {
    console.log("Handling card level event:", eventName, oldCards, boardId, listId, card);

    switch (eventName) {
        case "createCard": {
            const updatedCards = {
                ...oldCards,
                [boardId]: {
                    ...(oldCards[boardId] || {}),
                    [listId]: [...(oldCards[boardId]?.[listId] || []), card]
                }
            };
            // console.log("Updated cards after createCard event:", updatedCards);
            return updatedCards;
        }
        case "updateCard": {
            const updatedCards = {
                ...oldCards,
                [boardId]: {
                    ...(oldCards[boardId] || {}),
                    [listId]: [...oldCards[boardId][listId].map((c) => c.id === card.id ? { ...c, ...card } : c)]
                }
            };
            return updatedCards;
        }
        case "deleteCard": {
            const updatedBoards = {
                ...oldCards,
                [boardId]: {
                    ...(oldCards[boardId] || {}),
                    [listId]: [...oldCards[boardId][listId].filter((c) => c.id !== card.id)]
                }
            }
            return updatedBoards;
        }
        default: {
            console.log("Unhandled card level event:", eventName);
            return;
        }
    }
}

export {
    handleBoardLevelEvents,
    handleListLevelEvents,
    handleCardLevelEvents
}