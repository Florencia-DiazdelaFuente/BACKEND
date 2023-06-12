import { Router } from "express";
// import manager from "../../dao/managers/Product.js"
import Product from "../../dao/models/product.model.js";

const productsRouter = Router();

let allProducts = Product.find()

productsRouter.get('/all_products', async(req,res,next)=> {
    try {
        return res.render('products',
        {
            title: 'AllProducts',
            products: allProducts
        })
    } catch(error) {
        next(error)
    }
})


export default productsRouter;