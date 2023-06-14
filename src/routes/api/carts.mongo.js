import { Router } from "express"
import Carts from "../../dao/models/cart.model.js"
import Cart from "../../dao/models/cart.model.js"
import existCart from "../../middlewares/existsCart.js"
import existProduct from "../../middlewares/existsProduct.js"
import isStock from "../../middlewares/isStock.js"
import isQuantity from "../../middlewares/isQuantity.js"
import stockAdd from "../../middlewares/stockAdd.js"
import stockRemove from "../../middlewares/stockRemove.js"
const router = Router()

router.post('/', async(req,res,next)=> {
    try {
        let response = await Carts.create(req.body)
        if (response) {
            return res.json({ status:201,message:'cart created'})
        }
        return res.json({ status:400,message:'not created'})
    } catch(error) {
        next(error)
    }
})
router.get('/', async(req,res,next)=> {
    try {
        let carts = await Carts.find().populate("product", "title description price -_id")
        if (carts.length>0) {
            return res.json({ status:200, carts })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
router.get('/:cid', async(req,res,next)=> {
    try {
        let id = req.params.cid
        let one = await Carts.findById(id)
        if (one) {
            return res.json({ status:200,one })
        }
        let message = 'not found'
        return res.json({ status:404,message })
    } catch(error) {
        next(error)
    }
})
router.put('/:cid', async(req,res,next)=> {
    try {
        let id = req.params.cid
        let data = req.body
        let response = await Carts.findByIdAndUpdate(id,data, {new: true})
        if (response) {
            return res.json({ status:200,message:'cart updated'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})
router.delete('/:cid', async(req,res,next)=> {
    try {
        let id = req.params.cid
        let response = await Carts.findByIdAndDelete(id)
        if (response) {
            return res.json({ status:200,message:'cart deleted'})
        }
        return res.json({ status:404,message:'not found'})
    } catch(error) {
        next(error)
    }
})

router.put('/:cid/product/:pid/:units', existCart, existProduct, isStock, stockRemove, async(req,res,next)=> {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let quantity = Number(req.params.units)
        let data = { pid,quantity }
        await Cart.findByIdAndUpdate(cid, data)
        return res.json({ status:200,message:'Product added!' })
    } catch(error) {
        next(error)
    }
})
router.delete('/:cid/product/:pid/:units', existCart, existProduct, isQuantity, stockAdd, async(req,res,next)=> {
    try {
        let cid = req.params.cid
        let pid = req.params.pid
        let quantity = Number(req.params.units)
        let data = { pid,quantity }
        await Cart.findByIdAndDelete(cid, data)
        return res.json({ status:200,message:'Product removed!' })
    } catch(error) {
        next(error)
    }
})

export default router