import { useEffect, useState } from "react"
import { serverAxiosInstance } from "./../utility/axiosConfig.js";
import ChangeBoardWidget from "./ChangeBoardWidget.jsx";
import AddTaskWidget from './AddTaskWidget';
import ChangeViewWidget from './ChangeViewWidget';



const TasksBoard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [userBoards, setUserBoards] = useState([
        {
            "id": "5abbe4b7ddc1b351ef961414",
            "name": "Trello Platform Changes",
            "desc": "Track changes to Trello's Platform on this board.",
            "descData": "<string>",
            "closed": false,
            "idMemberCreator": "5abbe4b7ddc1b351ef961414",
            "idOrganization": "5abbe4b7ddc1b351ef961414",
            "pinned": false,
            "url": "https://trello.com/b/dQHqCohZ/trello-platform-changelog",
            "shortUrl": "https://trello.com/b/dQHqCohZ",
            "prefs": {
                "permissionLevel": "org",
                "hideVotes": true,
                "voting": "disabled",
                "comments": "<string>",
                "selfJoin": true,
                "cardCovers": true,
                "isTemplate": true,
                "cardAging": "pirate",
                "calendarFeedEnabled": true,
                "background": "5abbe4b7ddc1b351ef961414",
                "backgroundImage": "<string>",
                "backgroundImageScaled": [
                    {}
                ],
                "backgroundTile": true,
                "backgroundBrightness": "dark",
                "backgroundBottomColor": "#1e2e00",
                "backgroundTopColor": "#ffffff",
                "canBePublic": true,
                "canBeEnterprise": true,
                "canBeOrg": true,
                "canBePrivate": true,
                "canInvite": true
            },
            "labelNames": {
                "green": "Addition",
                "yellow": "Update",
                "orange": "Deprecation",
                "red": "Deletion",
                "purple": "Power-Ups",
                "blue": "News",
                "sky": "Announcement",
                "lime": "Delight",
                "pink": "REST API",
                "black": "Capabilties"
            },
            "limits": {
                "attachments": {
                    "perBoard": {}
                }
            },
            "starred": true,
            "memberships": "<string>",
            "shortLink": "<string>",
            "subscribed": true,
            "powerUps": "<string>",
            "dateLastActivity": "<string>",
            "dateLastView": "<string>",
            "idTags": "<string>",
            "datePluginDisable": "<string>",
            "creationMethod": "<string>",
            "ixUpdate": 2154,
            "templateGallery": "<string>",
            "enterpriseOwned": true
        }
    ]);
    const [currentBoard, setCurrentBoard] = useState(userBoards[0] || {});

    // useEffect(() => {
    //     const fetchUserBoards = async () => {
    //         setIsLoading(true);
    //         serverAxiosInstance.get("/boards")
    //             .then((res) => {
    //                 setUserBoards(res.data.userBoards);
    //                 setCurrentBoard(res.data.userBoards[0] || {});
    //             })
    //             .catch((err) => {
    //                 console.error("Error fetching user boards:", err);
    //             }).finally(() => {
    //                 setIsLoading(false);
    //             });
    //     }
    //     fetchUserBoards();
    // }, []);

    return (
        <div className="board-container">
            <div className="tool-bar">
                <h1 className="text-lg place-self-center">{currentBoard?.name}</h1>
                <div className="action-container">
                    <ChangeBoardWidget userBoards={userBoards} />
                    <AddTaskWidget />
                    <ChangeViewWidget />
                </div>
            </div>
            <div className="tasks-container">
                {isLoading ? (<div></div>)
                    : (userBoards.length === 0 ? <div>No boards available.</div> : userBoards.map((userBoard) => {
                        {/* Tasks will be rendered here */ }
                        return (
                            <div key={userBoard?.id} className="board-list-card" title={userBoard?.name}>
                                <div className="list-header">
                                    <h2 className="px-2">{userBoard?.name}</h2>

                                </div>
                                <div className="list-content"></div>
                            </div>
                        );
                    }))}
            </div>
        </div>
    )
}

export default TasksBoard