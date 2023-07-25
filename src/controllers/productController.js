import {productService}  from "../service/index.js"


export default class ProductController {
    constructor(){
        this.productService = productService

    }

        getProducts =  async(req,res,next)=> {
            const {limit , page } = req.query
            try {
                let all  = await this.productService.getProducts(limit, page)
                return res.status(200).json({ success: true, response: all })
            } catch (error) {
                return next(error)
            }
        
        }
        getProduct = async(req,res,next)=> {
            try {
                let pid = req.params.pid
                let product = await this.productService.getProduct(pid) 
                if (product) {
                    return res.json({ status:200,product })
                }
                let message = 'not found'
                return res.json({ status:404,message })
            } catch(error) {
                next(error)
            }
        }
        createProduct =  async(req,res,next)=> {
            try {
                const newProduct = req.body
                let response = await this.productService.createProduct(newProduct)
                if (response) {
                    return res.status(201).json({ status:201,message:'product created'})
                }
                return res.json({ status:400,message:'not created'})
            } catch(error) {
                next(error)
            }
        }
        updateProduct = async(req,res,next)=> {

            try {
                let pid = req.params.pid
                let data = req.body
                let response =  await this.productService.updateProduct(pid, data)
                if (response) {
                    return res.json({ status:200,message:'product updated'})
                }
                return res.json({ status:404,message:'not found'})
            } catch(error) {
                next(error)
            }
        }
        deleteProduct = async(req,res,next)=> {
            try {
                let pid = req.params.pid
                let response = await this.productService.deleteProduct(pid)
                if (response) {
                    return res.json({ status:200,message:'product deleted'})
                }
                return res.json({ status:404,message:'not found'})
            } catch(error) {
                next(error)
            }
        }

    }

// module.exports = new ProductController()


