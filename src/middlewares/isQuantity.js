import Carts from "../dao/Mongo/models/cart.model.js"

const isQuantity = (req, res, next) => {
	let cid = req.params.cid
	let units = req.params.units
    let quantity = Carts.findById(cid).quantity
	if (units <= quantity) {
		next()
	} else {
		return res.json({ status:400,message:"There are not enough products in your cart!" })
	}
}

export default isQuantity