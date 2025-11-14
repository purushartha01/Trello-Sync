const registerSocketEvents = (io, socket) => {
    socket.on("client:updateCard", (msg) => {
        console.log(`Received updateCard from ${socket.id}: ${JSON.stringify(msg)}`);
        // Broadcast the message to all other connected clients
        socket.broadcast.emit("server:updateCard", msg);
    });
}

module.exports={
    registerSocketEvents
}