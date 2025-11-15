import { useContext, useEffect, useMemo, useState } from "react"
import { serverAxiosInstance } from "../utility/axiosConfig";
import TaskList from "./TaskList";
import ContextMenu from "./ContextMenu";
import { useRef } from "react";
import { DataContext } from "../context/DataContext";

const ListCard = ({ list }) => {


    const listRef = useRef();

    const { cards, addCards, currentBoard } = useContext(DataContext);

    const cardsRef = useRef({});

    useEffect(() => {
        if (!list?.id || !currentBoard) return;

        if (cardsRef.current[currentBoard]?.[list.id]?.length > 0) return; // Cards already fetched

        const fetchCards = async () => {
            try {
                const res = await serverAxiosInstance.get(`/lists/${list.id}`);
                console.log("Fetched cards for list:", res.data.result);
                addCards(currentBoard, list.id, res.data.result);
                cardsRef.current = {
                    ...cardsRef.current,
                    [currentBoard]: {
                        ...(cardsRef.current[currentBoard] || {}),
                        [list.id]: [...res.data.result]
                    }
                };
            } catch (err) {
                console.error("Error fetching cards:", err);
            }
        };
        fetchCards();
    }, [addCards, currentBoard, list.id]);

    // TODO: Add link preview feature for card
    useEffect(() => { }, []);

    return (
        <div key={list?.id} className="board-list-card" title={list?.name}>
            <div ref={listRef} className="list-header pr-4">
                <h2 className="px-2">{list?.name}</h2>
                {/* TODO => EXTRA : add an archive list option */}
                <ContextMenu isList={true} item={list} itemRef={listRef.current} onEdit={() => { }} />
            </div>
            <div className="list-content">
                <TaskList cardList={cards[currentBoard]?.[list.id] || []} />
            </div>
        </div>
    )
}

export default ListCard