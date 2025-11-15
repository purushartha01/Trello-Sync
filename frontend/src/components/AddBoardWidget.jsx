import { useEffect, useRef, useState } from "react";
import { AddTaskCard } from "../utility/Icons"
import { serverAxiosInstance } from "../utility/axiosConfig";
import { toast } from 'sonner';
import { Spinner } from "./Widgets";


const AddBoardWidget = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");
  const [shouldCreateDefaultLists, setShouldCreateDefaultLists] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const menuRef = useRef();
  const iconRef = useRef();

  const handleCreateBoard = async () => {
    setIsCreating(true);
    if (!newBoardName.trim()) {
      console.error("Board name cannot be empty.");
      setIsCreating(false);
      toast.error("Board name cannot be empty.", {
        duration: 2000, cancel: {
          label: "Dismiss"
        }
      });
      return;
    }
    serverAxiosInstance.post("/boards", { name: newBoardName, desc: newBoardDescription, defaultLists: shouldCreateDefaultLists }).then((res) => {
      // console.log("New board created:", res.data);
      toast.success("Board created successfully!", {
        duration: 2000, cancel: {
          label: "Dismiss"
        }
      });
      setIsMenuVisible(false);
      setNewBoardName("");
      setNewBoardDescription("");
    }).catch((err) => {
      // console.error("Error creating new board:", err);
      toast.error("Failed to create board. Please try again.", {
        duration: 2000, cancel: {
          label: "Dismiss"
        }
      });
    }).finally(() => {
      setIsCreating(false);
    });
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !iconRef.current.contains(event.target)) {
        setIsMenuVisible(false);
        return;
      }
    }

    if (isMenuVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isMenuVisible]);


  return (
    <div className="relative">
      <span
        className="cursor-pointer" onClick={() => setIsMenuVisible(!isMenuVisible)}
        ref={iconRef}
        title="Create new Board"
      >
        <AddTaskCard className="" />
      </span>
      <div className={`${isMenuVisible ? 'flex' : 'hidden'} absolute top-[calc(100%+4px)] right-0 bg-white text-gray-800 w-[200px] border rounded-sm p-4 flex-col z-50`} ref={menuRef}>
        <h3 className="mb-2 font-semibold">Add New Board</h3>
        <div>
          <input
            type="text"
            className="w-full mb-2 p-1 border rounded"
            placeholder="Board Name"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
          />
          <textarea
            className="w-full mb-2 p-1 border rounded"
            placeholder="Board Description"
            value={newBoardDescription}
            onChange={(e) => setNewBoardDescription(e.target.value)}
          />
          <div className="flex flex-row items-center justify-center mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={shouldCreateDefaultLists}
                onChange={(e) => setShouldCreateDefaultLists(e.target.checked)}
              />
              <span className="ml-2">Create Default Lists</span>
            </label>
          </div>
          <button
            className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 cursor-pointer flex justify-center items-center"
            onClick={() => {
              console.log("Creating board:", newBoardName, newBoardDescription);
              handleCreateBoard();
            }}
            disabled={isCreating || !newBoardName.trim()}
          >
            {isCreating ? <Spinner classes={"border-white h-8"} /> :
              <span>
                Create Board
              </span>
            }
          </button>
        </div>
      </div>
    </div>

  )
}

export default AddBoardWidget