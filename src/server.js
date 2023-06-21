import app from "./app.js";
import { connect } from "mongoose"
// import { Server } from "socket.io";


const port = process.env.PORT || 8080;
const ready = ()=> {
    console.log("server ready on port " + port);
    connect(process.env.LINK_MONGO)
    .then(()=>console.log("database connected"))
    .catch(err=>console.log(err))

}
// const chats = [];

const http_server = app.listen(port,ready);
// const socket_server = new Server(http_server)

// socket_server.on(
//     'connection',
//     (socket) => {
//         console.log(`Client ${socket.client.id} connected`)
//         socket.on( "auth", ()=>{  socket_server.emit("allMessages", chats) } )
//         socket.on("new_message", (data) =>{
//             chats.push(data);
//             console.log(chats);
//             socket_server.emit("allMessages", chats)
//             })
//     }
//     )
