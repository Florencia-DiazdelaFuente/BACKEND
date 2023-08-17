import { Router } from "express";

const router = Router()

router.get("/loggerTest", (req,res)=>{
    req.logger.warning(`Alerta! - ${new Date().toLocaleString()} `)
    req.logger.error(`Esto es un error - ${new Date().toLocaleString()}`)

    res.send({message:"prueba de logger"})
})

export default router