import { useState } from "react";
import { AddCardIcon } from "../utility/Icons"
import { useRef } from "react";
import { useEffect } from "react";
import { serverAxiosInstance } from "../utility/axiosConfig";

const AddListWidget = ({ boardId }) => {

  const [isCardCreating, setIsCardCreating] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [isDialogShowing, setIsDialogShowing] = useState(false);


  const btnRef = useRef(null);
  const dialogRef = useRef(null);

  const handleCardCreation = async () => {
    if (!boardId || !newCardTitle.trim()) {
      console.error("Board ID or List Title is missing.");
      return;
    }
    setIsCardCreating(true);
    serverAxiosInstance.post("/lists", { boardId: boardId, name: newCardTitle }).then((res) => {
      console.log("New list created:", res.data);
    }).catch((err) => {
      console.error("Error creating new list:", err);
    }).finally(() => {
      setNewCardTitle("");
      setIsCardCreating(false);
      setIsDialogShowing(false);
    });
  }


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target) && btnRef.current && !btnRef.current.contains(event.target)) {
        setIsDialogShowing(false);
        return;
      }
    };
    if (isDialogShowing) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }

  }, [isDialogShowing]);

  return (
    <div className="relative">
      <button className="add-new-card h-12 min-h-10 w-full max-w-[350px] flex flex-row items-center justify-center gap-2 cursor-pointer bg-(--card-bg-color)" onClick={() => {
        setIsDialogShowing(!isDialogShowing);
      }}
        ref={btnRef}
      >
        <AddCardIcon />
        <span>Add New List</span>
      </button>

      <div
        className={`absolute h-44 w-full bg-white max-w-[350px] bg-main-bg-color text-black shadow-md rounded-md bottom-[calc(100%+0.5rem)] sm:top-14 z-1 ${isDialogShowing ? '' : 'hidden'}`}
        ref={dialogRef}
      >
        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Create New List</h2>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="List Title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleCardCreation}
          >
            {
              isCardCreating ?
                <span className="h-6 w-6 border-2 rounded-full border-t-transparent animate-spin border-white"></span>
                :
                <span>
                  Create List
                </span>
            }
          </button>
        </div>

      </div>

    </div>
  )
}

export default AddListWidget