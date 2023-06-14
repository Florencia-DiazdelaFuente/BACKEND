import Products from "../dao/models/product.model.js"

function existProduct (req,res,next) {
    let pid = req.params.pid
    let data = Products.findById(req.params.pid)
    if (data) {
        next()
    } else {
        return res.json({status: 400 , message: "Product not found"})
    }
}

export default existProduct