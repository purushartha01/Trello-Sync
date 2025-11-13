import { useRef } from "react";
import { AddToListIcon, DeleteIcon, EditListItemIcon, EllipsisIcon, EllipsisVerticalIcon, PencilIcon } from "./../utility/Icons";
import { useState, useEffect } from "react";
import { serverAxiosInstance } from "../utility/axiosConfig";


const ContextMenu = ({ isListItem = false, isList = false, isBoard = false, itemRef, item, onEdit }) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCompletionProcessing, setIsCompletionProcessing] = useState(false);
    const [shouldShowAddCardOption, setShouldShowAddCardOption] = useState(false);
    const [newCardContent, setNewCardContent] = useState("");


    const buttonRef = useRef(null);
    const menuRef = useRef(null);
    const addCardRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isMenuOpen])


    useEffect(() => {
        const handleClickOutsideAddCard = (event) => {
            if (addCardRef.current && !addCardRef.current.contains(event.target)) {
                setShouldShowAddCardOption(false);
            }
        }
        if (shouldShowAddCardOption) {
            document.addEventListener("mousedown", handleClickOutsideAddCard);
        } else {
            document.removeEventListener("mousedown", handleClickOutsideAddCard);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutsideAddCard);
        }
    }, [shouldShowAddCardOption]);



    const handleItemDeleteAction = async (url) => {
        if (!item) return;
        await serverAxiosInstance.delete(`${url}${item.id}`).then((res) => {
            console.log("Task deleted successfully", res.data);
        }).catch((err) => {
            console.error("Failed to delete task", err);
        }).finally(() => {
            setIsMenuOpen(false);
        });

    }

    const handleMarkAsCompleteAction = async (val) => {
        setIsCompletionProcessing(true);
        const target = itemRef;
        if (!target) return;
        serverAxiosInstance.put(`/task/${item?.id}`, {
            dueComplete: val
        }).then((res) => {
            console.log("Task marked as complete", res.data);
        }).catch((err) => {
            console.error("Failed to mark task as complete", err);
        }).finally(() => {
            setIsCompletionProcessing(false);
        });
    }

    const handleAddCardToList = async () => {
        if (!item) return;
        console.log("Adding card to list:", item.id, "with content:", newCardContent);
        serverAxiosInstance.post(`/tasks`, {
            name: newCardContent,
            listId: item.id,
            desc: ""
        }).then((res) => {
            console.log("Card added successfully to list:", res.data);
        }).catch((err) => {
            console.error("Failed to add card to list:", err);
        }).finally(() => {
            setNewCardContent("");
            setShouldShowAddCardOption(false);
        })
    }

    return (
        <div className="relative">
            <button
                onClick={() => {
                    //TODO:  Handle edit feature for Board
                    if (isBoard) return;
                    setIsMenuOpen((prev) => !prev);
                }}
                ref={buttonRef}
            >
                {

                    (isBoard ?
                        <PencilIcon />
                        :
                        ((isListItem) ?
                            <EllipsisVerticalIcon />
                            :
                            <EllipsisIcon />))
                }
            </button>
            {
                (isListItem || isList) &&
                <div
                    className={`${isMenuOpen ? "flex" : "hidden"} absolute w-45 bg-white shadow-lg rounded-md mt-2 flex-col top-full right-0 text-black z-10 p-2`}
                    ref={menuRef}
                >
                    <ul className="h-full w-full flex flex-col gap-2">
                        {
                            isList &&
                            <li>
                                <button className="context-menu-item" onClick={() => {
                                    setIsMenuOpen(false);
                                    setShouldShowAddCardOption(true);
                                }}>
                                    <span>
                                        <AddToListIcon />
                                    </span>
                                    <span>
                                        Add Card to List
                                    </span>
                                </button>
                            </li>
                        }
                        {
                            isListItem &&
                            <>
                                <li>
                                    <button className="context-menu-item" onClick={() => {
                                        handleMarkAsCompleteAction(item?.dueComplete ? false : true);
                                    }}>
                                        <span>
                                            <PencilIcon />
                                        </span>
                                        <span>
                                            {
                                                item?.dueComplete ? "Mark as Incomplete" : "Mark as Complete"
                                            }
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button className="context-menu-item" onClick={() => {
                                        setIsMenuOpen(false);
                                        if (!itemRef) return;
                                        onEdit(itemRef, item?.id);
                                    }}>
                                        <span>
                                            <EditListItemIcon />
                                        </span>
                                        <span>
                                            Edit {isList ? "List" : "Card"}
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button className="context-menu-item" onClick={() => {
                                        if (isBoard) {
                                            handleItemDeleteAction(`/boards/`);
                                        }
                                        else if (isList) {
                                            handleItemDeleteAction(`/lists/`);
                                        }
                                        else if (isListItem) {
                                            handleItemDeleteAction(`/tasks/`);
                                        }
                                    }}>
                                        <span>
                                            <DeleteIcon />
                                        </span>
                                        <span>
                                            Delete {isList ? "List" : "Card"}
                                        </span>
                                    </button>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            }
            {
                shouldShowAddCardOption &&
                <div className={`absolute top-10 right-0 z-20 bg-white text-black shadow-lg rounded-md p-4 h-80 w-50 grid grid-rows-[1fr_3fr_1fr]`} ref={addCardRef}>
                    <h3 className="font-semibold mb-2 text-lg self-center pl-4">Add New Card</h3>
                    <textarea className="w-full h-full p-2 border border-gray-300 rounded-md resize-none" value={newCardContent} placeholder="Enter card details..." onChange={(e) => { setNewCardContent(e.target.value) }}></textarea>
                    <div className="mt-2 grid grid-cols-2 gap-2 justify-end self-center">
                        <button className="py-1 px-2 bg-red-600 text-white rounded-md" onClick={() => setShouldShowAddCardOption(false)}>Cancel</button>
                        <button className="px-2 py-1 bg-green-600 text-white rounded-md" onClick={() => {
                            handleAddCardToList();
                        }}>Add Card</button>
                    </div>
                </div>
            }
        </div >
    )
}

export default ContextMenu