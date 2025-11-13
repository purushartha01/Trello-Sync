import { useEffect, useState } from "react"
import { serverAxiosInstance } from "../utility/axiosConfig";
import TaskList from "./TaskList";
import ContextMenu from "./ContextMenu";
import { useRef } from "react";


const ListCard = ({ list }) => {

    const [cardList, setCardList] = useState([]);

    const listRef = useRef();

    useEffect(() => {
        if (!list.id) {
            return;
        }

        const fetchCardsList = async () => {
            serverAxiosInstance.get(`/lists/${list.id}`).then((res) => {
                setCardList(res.data.result || []);
                console.log("Fetched cards for list:", res.data.result);
            }).catch((err) => {
                console.error("Error fetching cards for list:", err);
            });
        }

        fetchCardsList();

    }, [list.id]);

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
                <TaskList cardList={cardList} />
            </div>
        </div>
    )
}

export default ListCard