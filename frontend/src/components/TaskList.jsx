import React from "react";
import { useRef } from "react";
import ContextMenu from "./ContextMenu";
import { CheckIcon, TickIcon } from "../utility/Icons";
import { useEffect } from "react";
import { useState } from "react";
import { serverAxiosInstance } from "../utility/axiosConfig";
import { Spinner } from "./Widgets";
import useSocket from "../hooks/useSocket";


const TaskList = ({ cardList }) => {

  const [isEditing, setIsEditing] = useState(false);
  const [editableId, setEditableId] = useState(null);
  const [editReqProcessing, setIsEditReqProcessing] = useState(false);

  const itemRefs = useRef([]);

  const handleEditStart = (targetRef, id) => {

    setIsEditing(true);

    itemRefs.current.forEach(ref => {
      if (ref) ref.contentEditable = false;
    });

    if (targetRef) {
      const initialContent = targetRef.innerText;
      targetRef.contentEditable = true;
      targetRef.focus();
      targetRef.addEventListener("blur", (e) => {
        const clickedEl = e.relatedTarget;
        if (clickedEl && clickedEl.classList.contains("confirm-btn")) {
          return;
        }
        targetRef.innerText = initialContent;
        setIsEditing(false);
        targetRef.contentEditable = false;
      });
    }
    setEditableId(id);
  }

  const handleEditConfirmation = (e) => {
    setIsEditReqProcessing(true);
    const targetRef = itemRefs.current.find(ref => ref && ref.dataset.id === editableId);
    if (!targetRef) return;
    const editedName = targetRef.innerText;


    serverAxiosInstance.put(`/tasks/${editableId}`, {
      name: editedName,
    }).then((res) => {
      console.log("Task edited successfully", res.data);
    }).catch((err) => {
      console.error("Failed to edit task", err);
    }).finally(() => {
      setIsEditReqProcessing(false);
      itemRefs.current.forEach(ref => {
        if (ref) ref.contentEditable = false;
      });
      setIsEditing(false);
    });



  }

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, cardList.length);
  }, [itemRefs, cardList]);

  return (
    <ul className="h-full w-full flex flex-col gap-2">
      {
        cardList?.map((card, index) => {
          if (card.cardRole === "link") {
            return <li key={card?.id} className="list-card relative" title={card?.name}>
              {card?.dueComplete ? <CheckIcon className="text-green-600" /> : null}
              <a href={card?.name} className="px-2" data-id={card?.id} target="_blank" rel="noopener noreferrer" ref={(el) => itemRefs.current[index] = el}>{card?.name}</a>
              {(isEditing && editableId === card?.id) && <button tabIndex={0} className={`bg-blue-600 absolute confirm-btn`} onClick={handleEditConfirmation}>
                {
                  editReqProcessing ? (
                    <Spinner classes="text-white" />
                  ) : (

                    <TickIcon className="text-white" />
                  )
                }
              </button>}
              <ContextMenu isListItem={true} itemRef={itemRefs.current[index]} item={card} onEdit={(ref) => handleEditStart(ref)} />
            </li>
          }
          return (
            <li key={card?.id} className="list-card relative" title={card?.name}>
              {card?.dueComplete ? <CheckIcon className="text-green-600" /> : null}
              <p className="px-2" data-id={card?.id} ref={(el) => itemRefs.current[index] = el}>{card?.name}</p>
              {
                (isEditing && editableId === card?.id) && <button tabIndex={0} className={`bg-blue-600 absolute confirm-btn`} onClick={handleEditConfirmation}>
                  <TickIcon className="text-white" />
                </button>}
              <ContextMenu isListItem={true} itemRef={itemRefs.current[index]} item={card} onEdit={(ref, id) => handleEditStart(ref, id)} />
            </li>
          )
        })
      }
    </ul>
  )
}

export default TaskList