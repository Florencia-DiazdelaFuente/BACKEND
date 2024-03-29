import { Schema, model } from "mongoose";

const collection = "users"
const schema = new Schema({
    name: {type: String, required: true},
    lastName: {type: String, required: true},
    // fullName: {type: String, required: true},
    photo: {type: String, default: "https://cdn-icons-png.flaticon.com/512/456/456212.png"},
    email: {type: String, required: true, index: true, unique:true},
    age: {type: Number},
    role: {type: Number, default: 0},
    password: {type:String, required: true}
})

const User = model(collection, schema)
export default User