import net from "node:net";

export function startServer(port: number) {
    const server = net.createServer((socket) => {

        console.log("Client connected");

        socket.on("data", (chunk) => {
            console.log("Received", JSON.stringify(chunk.toString()));
            socket.write("+PONG\r\n");
        });

        socket.on("close", () => {
            console.log("Client Disconnected");
        });

        socket.on("error", (err) => {
            console.error("Socket Error", err.message);
        });
    });

    server.on("error", (err) => {
        console.error("Server Error", err.message);
    });

    server.listen(port, () => {
        console.log("Server Listening on port", port);
    });
    
    return server;
}