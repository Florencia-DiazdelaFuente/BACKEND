import ProductDaoMongo from "../dao/Mongo/product.mongo.js";
import CartDaoMongo from "../dao/Mongo/cart.mongo.js";
//este archivo es ideal para aplicar el patrón repository

const productService = new ProductDaoMongo()
const cartService = new CartDaoMongo()
//userService

export default {productService, cartService}

