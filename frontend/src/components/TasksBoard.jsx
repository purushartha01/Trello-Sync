import { useEffect, useState } from "react"
import { serverAxiosInstance } from "./../utility/axiosConfig.js";

const TasksBoard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userBoards, setUserBoards] = useState([]);

    useEffect(() => {
        const fetchUserBoards = async () => {
            setIsLoading(true);
            serverAxiosInstance.get("/boards")
                .then((res) => {
                    setUserBoards(res.data.userBoards);
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
                <h1 className="text-xl place-self-center">Your Tasks</h1>
                <div className="view-dropdown">

                </div>
                <div className="action-container">

                </div>
            </div>
            <div className="tasks-container p-2">
                {/* Tasks will be rendered here */}
                <div className="todo-list-container"></div>
                <div className="doing-list-container"></div>
                <div className="done-list-container"></div>
            </div>
        </div>
    )
}

export default TasksBoard