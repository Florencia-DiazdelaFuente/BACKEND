import Product from "./models/product.model.js"

export default class ProductDaoMongo {
    constructor(){
        this.productModel = Product
    }
    getProducts =   async (limit=5, page=1)=> {
        return await this.productModel.paginate({},{ limit,page })
        }
    getProduct =    async (pid)=> {
        return await this.productModel.findById(pid)
    }
    createProduct = async ()=> {
        return await this.productModel.create(newProduct)
    }
    updateProduct = async (pid, data)=> {
        return await this.productModel.findByIdAndUpdate(pid,data, {new: true})
    }
    deleteProduct = async (pid)=> {
        return await this.productModel.findByIdAndDelete(pid)
    }

}

