import {Router} from "express"
import {sendMail} from "../../utils/sendMail.js"

const mailRouter = Router()

mailRouter.get("/mail", async (req,res)=>{
    await sendMail()
    res.send("email enviado")
})


export default mailRouter