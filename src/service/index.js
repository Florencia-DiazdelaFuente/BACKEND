import ProductDaoMongo from "../dao/Mongo/productDaoMongo.js";
import CartDaoMongo from "../dao/Mongo/cartsDaoMongo.js";
import UsersDaoMongo from "../dao/Mongo/usersDaoMongo.js";
import ProductRepository from "../repository/productRepository.js";
import CartRepository from "../repository/cartRepository.js";
import UserRepository from "../repository/userRepository.js";
//este archivo es ideal para aplicar el patrón repository

const productService = new ProductRepository(new ProductDaoMongo()) 
const cartService = new CartRepository(new CartDaoMongo()) 
const userService = new UserRepository(new UsersDaoMongo()) 

export {productService, cartService, userService}

