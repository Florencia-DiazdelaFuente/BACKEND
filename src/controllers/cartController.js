import {cartService} from "../service/index.js"

export default class CartController {
    constructor(){
        this.cartService = cartService
    }

    getCarts = async(req,res,next)=> {
        try {
            let carts = this.cartService.get() 
            if (carts.length>0) {
                return res.json({ status:200, carts })
            }
            let message = 'not found'
            return res.json({ status:404,message })
        } catch(error) {
            next(error)
        }
    }
    getCart = async(req,res,next)=> {
        try {
            let cid = req.params.cid
            let one = this.cartService.getById(cid)
            if (one) {
                return res.json({ status:200,one })
            }
            let message = 'not found'
            return res.json({ status:404,message })
        } catch(error) {
            next(error)
        }
    }
    updateCart = async(req,res,next)=> {
        try {
            let cid = req.params.cid
            let data = req.body
            let response = this.cartService.update(cid, data)
            if (response) {
                return res.json({ status:200,message:'cart updated'})
            }
            return res.json({ status:404,message:'not found'})
        } catch(error) {
            next(error)
        }
    }
    createCart = async(req,res,next)=> {
        try {
            let response = this.cartService.create()
            if (response) {
                return res.json({ status:201,message:'cart created'})
            }
            return res.json({ status:400,message:'not created'})
        } catch(error) {
            next(error)
        }
    }
    deleteCart = async(req,res,next)=> {
        try {
            let cid = req.params.cid
            let response = this.cartService.delete(cid)
            if (response) {
                return res.json({ status:200,message:'cart deleted'})
            }
            return res.json({ status:404,message:'not found'})
        } catch(error) {
            next(error)
        }
    }

    updateCartUnit = async(req,res,next)=> {
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            let quantity = Number(req.params.units)
            let data = { pid,quantity }
            this.cartService.updateCartUnit(cid, data)
            
            return res.json({ status:200,message:'Product added!' })
        } catch(error) {
            next(error)
        }
    }

    deleteCartUnit = async(req,res,next)=> {
        try {
            let cid = req.params.cid
            let pid = req.params.pid
            let quantity = Number(req.params.units)
            let data = { pid,quantity }
            this.cartService.deleteCartUnit(cid, data)
            return res.json({ status:200,message:'Product removed!' })
        } catch(error) {
            next(error)
        }
    }


}