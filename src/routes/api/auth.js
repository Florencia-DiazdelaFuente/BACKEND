import {Router} from "express"
import User from "../../dao/models/User.js"
import validatorUser from "../../middlewares/validatorUser.js"
import passIs8 from "../../middlewares/passIs8.js"
import createHash from "../../middlewares/createHash.js"
import validPassword from "../../middlewares/validPassword.js"
import validatorSignin from "../../middlewares/validatorSignIn.js"
import passport from "passport"

const authRouter = Router()

//REGISTER
authRouter.post("/register", validatorUser, passIs8, createHash, passport.authenticate("register", {failureRedirect: "/api/auth/fail-register"}), 
(req, res)=> res.status(201).json({
        status: 201,
        success:true,
        message: "User created"
    }))

authRouter.get("/fail-register", (req,res)=> res.status(400).json({
    success: false,
    message: "error auth fail register"  //este error salta si el usuario está repetido
}))

//SIGN-IN
authRouter.post("/signin", validatorSignin, passIs8, 
passport.authenticate("signin", { failureRedirect: "/api/auth/fail-signin" }),
validPassword, 
(req,res,next)=>{
    try {
        const {email} = req.body 
        req.session.email = email
        req.session.role = req.user.role
        return res.status(200).json({
            status: 200,
            success: true,
            message: "User signed in"
        })
    }catch (error) {
        next(error)
    }
})

authRouter.get("/fail-signin", (req,res)=> res.status(400).json({
    success: false,
    message: "error auth fail signin"  
}))

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

authRouter.get("/github", passport.authenticate("github", {scope:["user:email"]}),(req,res)=>{})

authRouter.get(
    "/github/callback", 
    passport.authenticate("github", {failureRedirect: "/api/auth/fail-register-github" }),
    (req,res) => res.status(200).redirect("/")
    )

authRouter.get("/fail-register-github", (req, res)=> res.status(403).json({
    success: false,
    message: "bad auth"
}))

export default authRouter

