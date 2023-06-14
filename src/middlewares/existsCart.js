import Carts from "../dao/models/cart.model.js"

function existsCart (req,res,next) {
    let cid = req.params.cid
    let data = Carts.findById(cid)
    if (data) {
        next()
    } else {
        return res.json({status: 400, message: "Cart not found!"})
    }
}

export default existsCart