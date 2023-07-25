import Cart from "./models/cart.model.js"

export default class CartDaoMongo {
    constructor() {
        this.cartModel = Cart
    }

    getCarts = async() => {
        return await this.cartModel.find().populate("products.productId", "title description price -_id")
    }
    getCart = async(cid) => {
        return await this.cartModel.findById(cid)
    }
    updateCart = async(cid, data) => {
        return await this.cartModel.findByIdAndUpdate(cid,data, {new: true})
        
    }
    createCart = async() => {
        return await this.cartModel.create(req.body)
    }
    deleteCart = async(cid) => {
        return await this.cartModel.findByIdAndDelete(cid)}
    updateCartUnit = async() => {
        return await this.cartModel.findByIdAndUpdate(cid, data)
    }
    deleteCartUnit = async() => {
        return await this.cartModel.findByIdAndDelete(cid, data)
    }
}