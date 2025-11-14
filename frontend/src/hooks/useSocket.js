// src/hooks/useSocket.js
import { useEffect } from "react";
import socket from "../socketHandler/socket.js";

export default function useSocket(event, callback) {
    useEffect(() => {
        socket.on(event, callback);

        return () => {
            socket.off(event, callback);
        };
    }, [event, callback]);
}
