import { useEffect, useState } from "react"
import { serverAxiosInstance } from "./../utility/axiosConfig.js";
import ChangeBoardWidget from "./ChangeBoardWidget.jsx";
import ChangeViewWidget from './ChangeViewWidget';
import ListCard from "./ListCard.jsx";
import AddBoardWidget from "./AddBoardWidget.jsx";
import AddListWidget from "./AddListWidget.jsx";



const TasksBoard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userBoards, setUserBoards] = useState([]);
    const [currentBoard, setCurrentBoard] = useState(userBoards[0] || {});


    const updateCurrentBoard = (boardId) => {
        const selectedBoard = userBoards.filter((board) => {
            return board.id === boardId
        });
        setCurrentBoard(selectedBoard[0] || {});
    }

    useEffect(() => {
        const fetchUserBoards = async () => {
            setIsLoading(true);
            serverAxiosInstance.get("/boards")
                .then((res) => {
                    console.log("Fetched user boards:", res.data);
                    setUserBoards(res.data.userBoards);
                    setCurrentBoard(res.data.userBoards[0] || {});
                })
                .catch((err) => {
                    console.error("Error fetching user boards:", err);
                }).finally(() => {
                    setIsLoading(false);
                });
        }
        fetchUserBoards();
    }, []);

    return (
        <div className="board-container">
            <div className="tool-bar">
                <h1 className="text-lg self-center px-4">{currentBoard?.name}</h1>
                <div className="action-container">
                    <ChangeBoardWidget userBoards={userBoards} updateCurrentBoard={updateCurrentBoard} />
                    <AddBoardWidget />
                    <ChangeViewWidget />
                </div>
            </div>
            <div className="tasks-container">
                {isLoading ? (<div></div>)
                    : (userBoards.length === 0 ? <div>No boards available.</div> : currentBoard?.lists?.map((list) => {
                        {/* Tasks will be rendered here */ }
                        return (
                            <ListCard list={list} key={list?.id} />
                        );
                    }))}
                <AddListWidget boardId={currentBoard?.id} />
            </div>
        </div>
    )
}

export default TasksBoard