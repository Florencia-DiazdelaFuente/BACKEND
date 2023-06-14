import Products from "../dao/models/product.model.js"

const stockAdd = async(req, res, next) => {
	try {
		let pid = req.params.pid
		let units = Number(req.params.units)
        let product = Products.findById(pid)
        await Products.findByIdAndUpdate(pid, { stock: product.stock+units })
		next()
	} catch (error) {
		next(error)
	}
}

export default stockAdd