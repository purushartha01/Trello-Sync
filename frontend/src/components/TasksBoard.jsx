import { useCallback, useContext, useEffect, useState } from "react"
import { serverAxiosInstance } from "./../utility/axiosConfig.js";
import ChangeBoardWidget from "./ChangeBoardWidget.jsx";
import ChangeViewWidget from './ChangeViewWidget';
import ListCard from "./ListCard.jsx";
import AddBoardWidget from "./AddBoardWidget.jsx";
import AddListWidget from "./AddListWidget.jsx";
import useSocket from './../hooks/useSocket';
import { DataContext } from "../context/DataContext.jsx";
import { handleBoardLevelEvents, handleCardLevelEvents, handleListLevelEvents } from "../utility/webSocketEventsManager.js";
import { toast } from "sonner";
import { Spinner } from "./Widgets.jsx";


const TasksBoard = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { boards, cards, updateCards, updateBoards, currentBoard: contextCurrentBoard, updateCurrentBoard: contextUpdateCurrentBoard, currentBoardDetails, listsForBoard } = useContext(DataContext);

    const updateCurrentBoard = (boardId) => {
        const selectedBoard = boards.filter((board) => {
            return board.id === boardId
        });
        console.log("Switching to board:", selectedBoard[0]?.id);
        contextUpdateCurrentBoard(selectedBoard[0]?.id || "");
    }

    useSocket("trello:webhookEvent", ({ action, model }) => {
        console.log("Received webhook event via socket:", { action, model });
        if (action?.type.endsWith("Board")) {
            const updatedBoards = handleBoardLevelEvents(action.type, boards, model);
            if (updatedBoards) {
                updateBoards(updatedBoards);
            } else {
                contextUpdateCurrentBoard(contextCurrentBoard);
            }
        }
        if (action?.type.endsWith("List")) {
            const updatedBoards = handleListLevelEvents(action.type, boards, { boardId: model.id, newList: { ...action?.data?.list, isBoard: model.id } });
            console.log("Updated boards after list level event:", updatedBoards);
            if (updatedBoards) {
                updateBoards(updatedBoards);
            }
        }
        if (action?.type.endsWith("Card")) {
            console.log("Handling card level event:", cards);
            // const updatedCards = handleCardLevelEvents(action.type, cards, { boardId: model.id, listId: action?.data?.list.id, card: action?.data?.card });
            const updatedCards = handleCardLevelEvents(action.type, cards, { boardId: model.id, listId: action?.data?.list.id, card: action?.data?.card });
            console.log("Updated boards after card level event:", updatedCards);
            if (updatedCards) {
                updateCards(updatedCards);
            }

        }
    });

    useEffect(() => {
        const fetchUserBoards = async () => {
            setIsLoading(true);
            serverAxiosInstance.get("/boards")
                .then((res) => {
                    updateBoards(res.data.userBoards);
                    if (!contextCurrentBoard || contextCurrentBoard === "" || res.data.userBoards?.filter(
                        (b) => {
                            return contextCurrentBoard === b.id;
                        }
                    ).length <= 0) {
                        contextUpdateCurrentBoard(res.data.userBoards[0]?.id || "");
                    }
                    toast.success("Boards updated successfully from server.", {
                        duration: 2000,
                        cancel: {
                            label: "Dismiss"
                        }
                    });
                })
                .catch((err) => {
                    console.error("Error fetching user boards:", err);
                    toast.error("Failed to fetch boards from server.", {
                        cancel: {
                            label: "Dismiss"
                        },
                        duration: 2000,
                    });
                }).finally(() => {
                    setIsLoading(false);
                });
        }
        fetchUserBoards();
    }, [updateBoards, contextUpdateCurrentBoard, contextCurrentBoard]);

    return (
        <div className="board-container">
            <div className="tool-bar">
                <h1 className="text-xl self-center px-4 font-semibold">{currentBoardDetails?.name}</h1>
                <div className="action-container">
                    <ChangeBoardWidget userBoards={boards} updateCurrentBoard={updateCurrentBoard} />
                    <AddBoardWidget />
                    {/* TODO: Still not added the view switcher */}
                    {/* <ChangeViewWidget /> */}
                </div>
            </div>
            <div className="tasks-container">
                {isLoading ? (<Spinner classes={"border-white h-8"} />)
                    : (listsForBoard?.length === 0 ? <div>No lists available.</div> : listsForBoard?.map((list) => {
                        {/* Tasks will be rendered here */ }
                        return (
                            <ListCard list={list} key={list?.id} />
                        );
                    }))}
                <AddListWidget boardId={contextCurrentBoard} />
            </div>
        </div>
    )
}

export default TasksBoard