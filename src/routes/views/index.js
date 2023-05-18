import { Router } from "express"
import formRouter from "./form.js"
import productsRouter from "./products.js"
import messagesrouter from "./messages.js"
import oneProdRouter from "./oneProd.js"

const router = Router()

router.get('/', async(req,res,next)=> {
    try {
        return res.render('index',{
            title: 'index',
            description: 'ESTO VA EN EL MAIN',
            products: [
                {title: "producto1", img: "../../public/images/olmoWish.jpg"},
                {title: "producto2", img: "../../public/images/starkAmsterdam.jpg"},
                {title: "producto3", img: "../../public/images/starkThunder.jpg"}
            ]
        })
    } catch(error) {
        next(error)
    }
})

router.use("/form", formRouter)
router.use("/products", productsRouter)
// router.use("cart", cartRouter)
router.use("/messages", messagesrouter)
router.use("/products", oneProdRouter)



export default router