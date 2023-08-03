import principalRouter from "./principalRouter.js"
import jwt from "jsonwebtoken"
import config from "../../config/config.js"

export default class SessionRouter extends principalRouter {
    init(){
        this.post("/login", ["PUBLIC"], (req,res)=>{
            let user = {
                email: req.body.email,
                role: "user"
            }
            let token = jwt.sign(user, config.secretJWT);
            res.sendSuccess({token})

        })
    }
}