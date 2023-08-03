import { Router } from "express"
import Product from "../../dao/Mongo/models/product.model.js"
import validatorProduct from "../../middlewares/validatorProduct.js"
import passport from "passport"
import passport_call from "../../middlewares/passport_call.js"
import authorization from "../../middlewares/authorization.js"
// import {createProduct, getProducts, getProduct,  updateProduct, deleteProduct} from "../../controllers/productController.js"
import ProductController from "../../controllers/productController.js"


const router = Router()
const productController = new ProductController()


router.post('/', validatorProduct, productController.createProduct )
// router.get('/', passport_call("jwt"), authorization, productController.getProducts)
router.get('/', productController.getProducts)
router.get('/:pid', productController.getProduct )
router.put('/:pid', productController.updateProduct )
router.delete('/:pid', productController.deleteProduct)

export default router