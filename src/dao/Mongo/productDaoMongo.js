import Product from "./models/product.model.js"

export default class ProductDaoMongo {
    constructor(){
        this.productModel = Product
    }
    get =   async (limit=5, page=1)=> {
        return await this.productModel.paginate({},{ limit,page })
        }
    getById =    async (pid)=> {
        return await this.productModel.findById(pid)
    }
    create = async (data)=> {
        return await this.productModel.create(data)
    }
    update = async (pid, data)=> {
        return await this.productModel.findByIdAndUpdate(pid,data, {new: true})
    }
    delete = async (pid)=> {
        return await this.productModel.findByIdAndDelete(pid)
    }

}

