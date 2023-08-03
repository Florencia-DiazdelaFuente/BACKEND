import {productService}  from "../service/index.js"


export default class ProductController {
    constructor(){
        this.productService = productService
    }

        getProducts =  async(req,res,next)=> {
            try {
                const {limit , page } = req.query
                let products  = await this.productService.get(limit, page)
                return res.status(200).json({ success: true, response: products })
            } catch (error) {
                return next(error)
            }
        
        }
        getProduct = async(req,res,next)=> {
            try {
                let pid = req.params.pid
                let product = await this.productService.getById(pid) 
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
                let response = await this.productService.create(newProduct)
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
                let response =  await this.productService.update(pid, data)
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
                let response = await this.productService.delete(pid)
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


