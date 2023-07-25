import {Router} from "express"
import User from "../../dao/Mongo/models/User.js"
import validatorUser from "../../middlewares/validatorUser.js"
import passIs8 from "../../middlewares/passIs8.js"
import createHash from "../../middlewares/createHash.js"
import validPassword from "../../middlewares/validPassword.js"
import validatorSignin from "../../middlewares/validatorSignIn.js"
import passport from "passport"
import createToken from "../../middlewares/createToken.js"
import passport_call from "../../middlewares/passport_call.js"


const authRouter = Router()

//REGISTER
authRouter.post("/register", 
validatorUser, 
passIs8, 
createHash, 
passport.authenticate("register", {failureRedirect: "/api/auth/fail-register"}), 
(req, res)=> res.status(201).json({
        status: 201,
        success:true,
        message: "User created",
        // passport: req.session.passport,
        // user: req.user

    }))

authRouter.get("/fail-register", (req,res)=> res.status(400).json({
    success: false,
    message: "error auth fail register"  //este error salta si el usuario está repetido
}))



//SIGN-IN
authRouter.post("/signin", 
validatorSignin, 
passIs8, 
passport.authenticate("signin", { failureRedirect: "/api/auth/fail-signin" }),
validPassword, 
createToken,
(req,res,next)=>{
    try {
        const {email} = req.body 
        req.session.email = email
        req.session.role = req.user.role
        return res.status(200).cookie("token", req.token, {maxAge:60*60*1000, httpOnly:true}).json({
            status: 200,
            success: true,
            message: "User signed in",
            // passport: req.session.passport,
            // user: req.user

        })
    }catch (error) {
        next(error)
    }
})

authRouter.get("/fail-signin", (req,res)=> res.status(400).json({
    success: false,
    message: "error auth fail signin"  
}))

// SIGN IN GITHUB

authRouter.get("/github", 
passport.authenticate("github", {scope:["user:email"]}),(req,res)=>{})

authRouter.get(
    "/github/callback", 
    passport.authenticate("github", {failureRedirect: "/api/auth/fail-register-github" }),
    (req,res) => res.status(200).redirect("/")
    )

authRouter.get("/fail-register-github", (req, res)=> res.status(403).json({
    success: false,
    message: "bad auth"
}))


//SIGN-OUT
authRouter.post("/signout", 
passport_call('jwt'),
    async(req,res,next)=>{
        try {
            return res.status(200).clearCookie('token').json({
                success: false,
                message: 'user signed out!'
            })
        } catch (error) {
            next(error)
        }
    }

// passport_call("jwt", {session: false}),

// async(req,res,next)=>{
//     try {
//         const {email} = req.body 
//         const one = await User.findOne({email})
//         if (one) {
//             req.session.destroy()
//             return res.status(200).json({
//                 success: true,
//                 message: "User signed out"
//             })
//         } else {
//             return res.status(404).json({
//                 success: false,
//                 message: "Cannot sign out. User not found"
//             })
//         }
//     } catch (error) {
//         next(error)
//     }
// }
)



export default authRouter

