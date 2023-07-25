import dotenv from "dotenv"
import commander from "../utils/commander";
import MongoSingleton from "./mongoSingleton";

const {mode} = commander.opts()


// const environment = "production"
dotenv.config({
    path: environment === "development" ? "./.env.development" : "./.env.production"
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
    connectDB: () => MongoSingleton.getInstance()
}