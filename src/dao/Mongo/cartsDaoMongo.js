import Cart from "./models/cart.model.js"

export default class CartDaoMongo {
    constructor() {
        this.cartModel = Cart
    }

    get = async() => {
        return await this.cartModel.find().populate("products.productId", "title description price -_id")
    }
    getById = async(cid) => {
        return await this.cartModel.findById(cid)
    }
    update = async(cid, data) => {
        return await this.cartModel.findByIdAndUpdate(cid,data, {new: true})
        
    }
    create = async(newCart) => {
        return await this.cartModel.create(newCart)
    }
    delete = async(cid) => {
        return await this.cartModel.findByIdAndDelete(cid)}
    updateCartUnit = async() => {
        return await this.cartModel.findByIdAndUpdate(cid, data)
    }
    deleteCartUnit = async() => {
        return await this.cartModel.findByIdAndDelete(cid, data)
    }
}