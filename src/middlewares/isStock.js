import Products from "../dao/models/product.model.js"

function isStock(req,res,next) {
    let pid = req.params.pid
    let units = Number(req.params.units)
    let stock = Products.findById(pid).stock
    if(units <= stock) {
        next()
    } else {
        return res.json({status: 400, message: "There are not enough products available"})
    }
}
export default isStock