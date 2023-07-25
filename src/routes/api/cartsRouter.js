import { Router } from "express"
import Carts from "../../dao/Mongo/models/cart.model.js"
import Cart from "../../dao/Mongo/models/cart.model.js"
import existCart from "../../middlewares/existsCart.js"
import existProduct from "../../middlewares/existsProduct.js"
import isStock from "../../middlewares/isStock.js"
import isQuantity from "../../middlewares/isQuantity.js"
import stockAdd from "../../middlewares/stockAdd.js"
import stockRemove from "../../middlewares/stockRemove.js"
import CartController from "../../controllers/cartController.js"

const router = Router()
const cartController = new CartController()

router.post('/', cartController.createCart )
router.get('/', cartController.getCarts)
router.get('/:cid', cartController.getCart )
router.put('/:cid', cartController.updateCart)
router.delete('/:cid', cartController.deleteCart )

router.put('/:cid/product/:pid/:units', existCart, existProduct, isStock, stockRemove)
router.delete('/:cid/product/:pid/:units', existCart, existProduct, isQuantity, stockAdd, cartController.deleteCartUnit )

export default router