import { Router } from "express"
import authRouter from "./auth.js"
// import productsRouter from "./products.js"
import productsRouter from "./productsRouter.js"
import cartsRouter from "./cartsRouter.js"
import cookies_router from "./cookies.js"
import UsersRouter from "./userRouter.js"
import SessionRouter from "./sessionRouter.js"


const router = Router()
const usersRouter = new UsersRouter()
const sessionRouter = new SessionRouter()


router.use('/auth',authRouter)
router.use('/products',productsRouter)
router.use('/carts',cartsRouter)
router.use("/cookies", cookies_router)
router.use("/users", usersRouter.getRouter())
router.use("/sessions", sessionRouter.getRouter())


export default router