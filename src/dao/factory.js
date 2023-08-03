import config from "../config/config";
import ProductDaoMongo from "./Mongo/productDaoMongo.js"
import CartDaoMongo from "./Mongo/cartsDaoMongo.js";
// import UsersDaoMongo from 
// import ProductDaoMemory from "./Memoria/productDaoMemory.js"
// import CartDaoMemory from "./Memoria/cartDaoMemory.js"


let ProductDao
let UserDao
let CartDao

switch (config.persistence) {
    case "MONGO":
        
            ProductDao = ProductDaoMongo
            CartDao = CartDaoMongo
            // UserDao = UserDaoMongo
        break;
        case "MEMORY":
            // ProductDao = ProductDaoMemory
            // CartDao = CartDaoMemory
        
        break;
        case "FILE":
        
        break;

    default:
        break;
}

export {ProductDao, CartDao, UserDao}