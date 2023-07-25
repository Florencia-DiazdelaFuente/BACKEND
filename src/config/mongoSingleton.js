import mongoose from "mongoose";
export default class MongoSingleton {
    static #instance
    constructor() {
        mongoose.connect(process.env.LINK_MONGO, {useNewUrlParser: true, useUnifiedTopology: true})
    }
    static getInstance() {
        if (this.#instance) {
            console.log("already connected")
            return this.#instance

        }
        this.#instance = new MongoSingleton();
        console.log("connected");
        return this.#instance
    }
}