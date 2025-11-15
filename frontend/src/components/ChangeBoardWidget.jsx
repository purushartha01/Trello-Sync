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
            <div className={`${isMenuVisible ? 'flex' : 'hidden'} flex-col absolute top-[calc(100%+4px)] -right-full bg-white text-gray-800 w-[180px] max-h-[20dvh] border rounded-sm py-2 z-50`} ref={menuRef}>
                {userBoards ? userBoards?.map((board) => {
                    return (
                        <span key={board?.id}
                            className={`px-1 py-2 hover:bg-gray-200 cursor-pointer border-b-2 border-gray-300 max-h-10 max-w-[180px] truncate ${board?.id === currentBoard ? 'bg-blue-200 font-bold' : ''}`}
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