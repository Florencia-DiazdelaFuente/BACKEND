import app from "./app.js"
import { Server } from "socket.io"


const PORT = 8080
const ready = ()=> console.log("server ready on port " + PORT)

const http_server = app.listen(PORT,ready)
const socket_server = new Server(http_server)

socket_server.on(
    'client_connected',
    socket => console.log(`client ${socket.id} connected`)
)

