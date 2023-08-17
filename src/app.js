import "dotenv/config.js";
import express from "express"
import expressSession from "express-session"
import router from "./routes/index.js"
import errorHandler from "./middlewares/errorHandler.js"
import notFoundHandler from "./middlewares/notFound.js"
import {__dirname} from "./utils.js"
import logger from "morgan";
import cookieParser from "cookie-parser"
import mongoStore from "connect-mongo"
import passport from "passport";
import initializePassport from "./config/passport.js"
import config from "./config/config.js"; 
import { addLogger } from "./config/logger.js";

const app = express()


// MIDDLEWARES
app.use(expressSession({
    secret: config.secretSession,
    resave: true,
    saveUninitialized: true,
    store: mongoStore.create({
        mongoUrl: config.linkMongo,
        ttl: 10000
    })
}))

app.use('',express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(logger("dev"))
app.use(cookieParser(config.secretCookie))
initializePassport()
app.use(passport.initialize())
app.use(passport.session())
app.use(addLogger)

//ROUTER
app.use('/',router)
app.use(errorHandler)
app.use(notFoundHandler)

// DATABASE
// connect(LINK_MONGO)
//     .then(()=>console.log("database connected"))
//     .catch(err=>console.log(err))


export default app;
