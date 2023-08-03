import dotenv from "dotenv"
import commander from "../utils/commander.js";
import MongoSingleton from "./mongoSingleton.js";

const {mode} = commander.opts()


// const environment = "production"
dotenv.config({
    path: mode === "development" ? "./.env.development" : "./.env.production"
});

export default {
    port : process.env.PORT,
    linkMongo : process.env.LINK_MONGO,
    secretSession : process.env.SECRET_SESSION,
    secretJWT: process.env.SECRET_JWT,
    secretCookie: process.env.SECRET_COOKIE,
    GHAppID: process.env.GH_APP_ID,
    GHClientID: process.env.GH_CLIENT_ID,
    GHClientSecret: process.env.GH_CLIENT_SECRET,
    persistence: process.env.PERSISTENCE,
    gmailUserApp: process.env.GMAIL_USER,
    gmailPassApp: process.env.GMAIL_PASS_APP,
    connectDB: () => MongoSingleton.getInstance()
}