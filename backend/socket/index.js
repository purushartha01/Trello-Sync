const { Server } = require("socket.io");
const { registerSocketEvents } = require("./events");


let io = null;

const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"]
        }
    });

    console.log("Socket.io initialized");
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);
        registerSocketEvents(io, socket);
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
}

const getIO = () => {
    if (!io) {
        throw new Error("Socket has not yet been initialized");
    }
    return io;
}

module.exports = {
    initSocket,
    getIO
}