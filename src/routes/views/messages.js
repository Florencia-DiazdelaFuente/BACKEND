import { Router } from "express";

const messagesRouter = Router()
messagesRouter.get("/chat", async (req,res,next)=>{
	try {
return res.render(
	"chat",
	{
        title: "chat",
        script: "chat.js"
    }
)} catch(error) {next(error)}
})

export default messagesRouter;