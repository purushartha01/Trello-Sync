import { createContext, useCallback, useMemo, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children, value }) => {
    const [boards, setBoards] = useState(JSON.parse(localStorage.getItem("boards")) || []);
    const [currentBoard, setCurrentBoard] = useState(JSON.parse(localStorage.getItem("currentBoard")) || "");
    const [cards, setCards] = useState(JSON.parse(localStorage.getItem("cards")) || {});

    const updateBoards = useCallback((newBoards) => {
        setBoards(newBoards);
        localStorage.setItem("boards", JSON.stringify(newBoards));
    }, []);

    const updateCurrentBoard = useCallback((board) => {
        setCurrentBoard(board);
        localStorage.setItem("currentBoard", JSON.stringify(board));
    }, []);

    const currentBoardDetails = useMemo(() => {
        return boards.find(board => board.id === currentBoard) ?? null;
    }, [boards, currentBoard]);

    const listsForBoard = useMemo(() => {
        return currentBoardDetails?.lists ?? [];
    }, [currentBoardDetails]);

    const addCards = useCallback((boardId, listId, newCards) => {

        setCards((prev) => {
            const updated = {
                ...prev,
                [boardId]: {
                    ...(prev[boardId] || {}),
                    [listId]: [...newCards]
                }
            };
            localStorage.setItem("cards", JSON.stringify(updated));
            return updated;
        });
    }, []);

    const updateCards = useCallback((newCards) => {
        setCards(newCards);
        localStorage.setItem("cards", JSON.stringify(newCards));
    }, []);

    const contextValues = useMemo(() => ({
        boards,
        cards,
        currentBoard,
        updateBoards,
        updateCurrentBoard,
        updateCards,
        currentBoardDetails,
        listsForBoard, addCards,
    }), [boards, cards, currentBoard, updateBoards, updateCurrentBoard, updateCards, currentBoardDetails, listsForBoard, addCards]);
    return (
        <DataContext.Provider value={contextValues}>
            {children}
        </DataContext.Provider>
    );
}

export { DataProvider, DataContext };