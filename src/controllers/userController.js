import UserDTO from "../dto/userDto";
import { cartService } from "../service";

export default class UserController {
    constructor(){
        this.service = new cartService
    }
    
    getUsers = async (req,res) => {
        try {
            const {page = 1} = req.query
            let users = await this.service.get()
            res.send({
                status: "success",
                users: users
            })
        } catch (error) {
            console.log(error)
        }
    }

    createUsers = async (req,res) => {
        try {
            let {name, apellido, email, password} = req.body
            if(!name || !lastName || !email || !password) {
                return res.status(400).send({
                    status: "error",
                    message: "todos los campos son necesarios"
                })
            }

            let newUser = new UserDTO({nombre, apellido, email, password})

            let result = await this.service.create(newUser)
            res.status(200).send({result})
        } catch (error) {
            console.log(error)
        }
    }

    updateUsers = async (req,res) => {
        const {uid} = req.params
        const user = req.body

        if(!user.name || !user.lastName) {
            return res.status(400).send({
                status: "error",
                message: "todos los campos son necesarios"
            })
        }
        let userToReplace = {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
        }

        let result = await this.service.updateOne({_id : uid}, userToReplace)

        res.send({
            status: "success",
            payload: result
        })

    }
    deleteUser = async (req,res) => {
        try {
            let {uid} = req.params

            let result = await this.service.deleteOne({_id : uid})
            res.send({
                status: "success",
                payload: result
            })
    
        } catch(error) {
            console.log(error)
        }

    }



}