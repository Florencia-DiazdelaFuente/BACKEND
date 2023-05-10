import express from "express"
import router from "./routes/index.js"
import errorHandler from "./middlewares/errorHandler.js"
import notFoundHandler from "./middlewares/notFound.js"
import {__dirname} from "./utils.js"
import { engine } from 'express-handlebars'


const server = express()

const PORT = 8080
const ready = ()=> console.log("server ready on port " + PORT)

server.engine('handlebars',engine())
server.set('views',__dirname+'/views')
server.set('view engine','handlebars')

server.use('/public',express.static('public'))
server.use(express.json())
server.use(express.urlencoded({extended:true}))
server.use('/',router)
server.use(errorHandler)
server.use(notFoundHandler)

server.listen(PORT,ready)