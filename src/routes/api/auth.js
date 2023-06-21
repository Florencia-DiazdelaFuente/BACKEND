import {Router} from "express"
import User from "../../dao/models/User.js"
import validator from "../../middlewares/validatorUser.js"
import validPassword from "../../middlewares/password.js"

const authRouter = Router()

//REGISTER
authRouter.post("/register", validator, validPassword, async(req, res, next)=>{
    try {
        await User.create(req.body)
        return res.status(201).json({
            success:true,
            message: "User created"
        })
    } catch (error) {
        next(error)
    }
})

//SIGN-IN
authRouter.post("/signin", async(req,res,next)=>{
    try {
        const {email} = req.body 
        const one = await User.findOne({email})
        if (one) {
            req.session.email = email
            req.session.role = one.role
            return res.status(200).json({
                success: true,
                message: "User signed in"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Cannot sign in. User not found"
            })
        }
    } catch (error) {
        next(error)
    }
})

//SIGN-OUT
authRouter.post("/signout", async(req,res,next)=>{
    try {
        const {email} = req.body 
        const one = await User.findOne({email})
        if (one) {
            req.session.destroy()
            return res.status(200).json({
                success: true,
                message: "User signed out"
            })
        } else {
            return res.status(404).json({
                success: false,
                message: "Cannot sign out. User not found"
            })
        }
    } catch (error) {
        next(error)
    }
})

export default authRouter

