import { Router } from "express"
// import authRouter from "./auth.js"
// import productsRouter from "./products.js"
import productsRouter from "./products.mongo.js"
import cartsRouter from "./carts.mongo.js"
// import studentsRouter from "./students.mongo.js"

const router = Router()

// router.use('/auth',authRouter)
router.use('/products',productsRouter)
router.use('/carts',cartsRouter)
// router.use("/students", studentsRouter)

export default router