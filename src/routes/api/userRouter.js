// ejemplo de router de usuarios con ruteo avanzado C23

import principalRouter from "./principalRouter.js"

export default class UserRouter extends principalRouter{
    init(){
        this.get("/",["PUBLIC"],async (req,res)=>{
            try {
                res.sendSuccess("hola coder - get user")
            } catch (error) {
                res.sendServerError(error)
            }
        })
// ruta de prueba
        this.get("/currentUser",["USER","USER_PREMIUM"],async (req,res)=>{
            try {
                res.sendSuccess(req.user)
            } catch (error) {
                res.sendServerError(error)
            }
        })
    }

}