import { useContext, useEffect, useRef, useState } from "react"
import { ChangeBoard } from "../utility/Icons"
import { DataContext } from "../context/DataContext";


const ChangeBoardWidget = ({ userBoards, updateCurrentBoard }) => {

    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const menuRef = useRef();
    const iconRef = useRef();

    const { currentBoard } = useContext(DataContext);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && iconRef.current && !iconRef.current.contains(event.target)) {
                setIsMenuVisible(false);
            }
        }

        if (isMenuVisible) {
            document.addEventListener('mousedown', handleOutsideClick);
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }

    }, [isMenuVisible]);

    return (
        <div className="relative">
            <span
                onClick={() => { console.log("ChangeBoard clicked", isMenuVisible); setIsMenuVisible((prev) => !prev); }}
                ref={iconRef}
                className="cursor-pointer"
                title="Change Board"
            >
                <ChangeBoard className="md:cursor-pointer" />
            </span>
            <div className={`${isMenuVisible ? 'flex' : 'hidden'} flex-col absolute top-[calc(100%+4px)] -right-full bg-white text-gray-800 w-[180px] max-h-[20dvh] overflow-y-auto border rounded-sm pb-2 z-50`} ref={menuRef}>
                <h3 className="px-2 mb-2 font-semibold border-b border-x-transparent border-t-transparent fixed h-10 w-[178px] z-10 bg-(--main-bg-color) text-white flex items-center ">Select Board</h3>
                {userBoards ? userBoards?.map((board) => {
                    return (
                        <span key={board?.id}
                            className={`px-1 py-2 hover:bg-gray-200 cursor-pointer border-b-2 first-of-type:mt-10 border-gray-300 max-h-10 max-w-[180px] min-h-10 truncate ${board?.id === currentBoard ? 'bg-blue-200 font-bold' : ''}`}
                            onClick={() => { updateCurrentBoard(board?.id); setIsMenuVisible(false); }}
                        >
                            <span>
                                {board?.name}
                            </span>
                        </span>
                    )
                }) : <span>No boards available</span>}
            </div>
        </div >
    )
}

export default ChangeBoardWidget