import { Router } from "express";
import manager from "../../managers/Product.js"

const productsRouter = Router();

let allProducts = manager.readProducts()

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