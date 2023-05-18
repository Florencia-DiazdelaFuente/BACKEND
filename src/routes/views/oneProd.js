import { Router } from "express";
import manager from "../../managers/Product.js"

const oneProdRouter = Router()

let one = manager.readProduct()
console.log(one)
oneProdRouter.get( "/:pid", async (req,res,next)=>{
	try {
return res.render(
	"oneProd",
	{
        detail: "detalle del producto",
        product: one,
        title : "Un producto"

    }
)} catch(error) {next(error)}
})

export default oneProdRouter;