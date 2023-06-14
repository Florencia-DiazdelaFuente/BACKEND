import "dotenv/config.js";
import {connect} from "mongoose"
import express from "express"
import router from "./routes/index.js"
import errorHandler from "./middlewares/errorHandler.js"
import notFoundHandler from "./middlewares/notFound.js"
import {__dirname} from "./utils.js"
import logger from "morgan";


const app = express()


// MIDDLEWARES
app.use('',express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger("dev"))

//ROUTER
app.use('/',router)
app.use(errorHandler)
app.use(notFoundHandler)

// DATABASE
connect("mongodb+srv://flordiaz:hola1234@dbflorencia.35cenzt.mongodb.net/commerce")
    .then(()=>console.log("database connected"))
    .catch(err=>console.log(err))


export default app;
