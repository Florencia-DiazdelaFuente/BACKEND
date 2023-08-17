import app from "./app.js";
import { connect } from "mongoose"
import config from "./config/config.js"
import logger from "./config/logger.js";
// import { Server } from "socket.io";


// const port = process.env.PORT || 8080;
const ready = ()=> {
    logger.info("server ready on port " + config.port);
    connect(config.linkMongo)
    .then(()=>logger.info("database connected"))
    .catch(err=>logger.error(err))

}
// const chats = [];

const http_server = app.listen(config.port,ready);
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
