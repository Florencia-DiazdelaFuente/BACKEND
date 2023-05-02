import express from "express"
import manager from "./app.js"
import cartManager from "./cart.js"
const server = express()

const PORT = 8080
const ready = ()=> console.log("server ready on port " + PORT)

server.listen(PORT, ready)
server.use(express.urlencoded({extended:true}))

let indexRoute = "/"
let indexFunction = (req,res) => {
    let quantity = manager.readProducts().length
    console.log(quantity)
    return res.send(`There are ${quantity} products`)
}


server.get(indexRoute, indexFunction)

let oneRoute = "/products/:pid"
let oneFunction = (req, res)=>{
    let parametros = req.params
    let pid = Number(parametros.pid)
    let one = manager.readProduct(pid)
    if (one) {
        return res.send({
            success: true,
            product: one
        })
    } else {
        return res.send({
            success: false,
            product: "not found"
        })
    }
}

server.get(oneRoute, oneFunction)

let queryRoute = "/products"
let queryFunction = (req,res) => {
    let limit = req.query.limit ?? 9
    let products = manager.readProducts().slice(0, limit)
    if (products.length>0) {
        return res.send({
            success: true,
            products: products
        })
    } else {
        return res.send({
            success: false,
            products: "not found"
        })
    }
}

server.get(queryRoute, queryFunction)

// ---- CART--------------

let cartRoute = "/carts"
let cartFunction = (req,res) => {
    let carts = cartManager.readCarts()
    console.log(carts)
    if (carts.length>0) {
        return res.send({
            success: true,
            carts: carts
        })
    } else {
        return res.send({
            success: false,
            carts: "not found"
        })
    }
}

server.get(cartRoute, cartFunction)

let cartIdRoute = "/carts/:cid"
let cartIdFunction = (req, res)=>{
    let parametros = req.params
    let cid = Number(parametros.cid)
    let one = cartManager.readCart(cid)
    if (one) {
        return res.send({
            success: true,
            cart: one
        })
    } else {
        return res.send({
            success: false,
            cart: "not found"
        })
    }
}

server.get(cartIdRoute, cartIdFunction)