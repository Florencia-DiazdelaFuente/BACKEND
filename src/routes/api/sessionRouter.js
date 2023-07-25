import principalRouter from "./principalRouter.js"
import jwt from "jsonwebtoken"

export default class SessionRouter extends principalRouter {
    init(){
        this.post("/login", ["PUBLIC"], (req,res)=>{
            let user = {
                email: req.body.email,
                role: "user"
            }
            let token = jwt.sign(user, process.env.SECRET_JWT);
            res.sendSuccess({token})

        })
    }
}