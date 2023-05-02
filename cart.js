import fs from "fs"


class CartManager {
    
    constructor (path) {
        this.carts = []
        this.path = path
        this.init(path)
    }

    init(path) {
        let existFile = fs.existsSync(path)

        if (!existFile) {
            fs.writeFileSync(path, JSON.stringify([]))
            console.log("File created at path: " + this.path)
            return "File created at path: " + this.path
            
        } else {
            this.products = JSON.parse(fs.readFileSync(path, "utf-8"))
            console.log("data recovered")
            return "data recovered"
        }

    }


    async getCarts () {
        try {
            const response = await fs.promises.readFile(this.path, "utf-8");
            if (!response) {
                console.log("not found")
                return "not found"
            } else {
                console.log(response)
                return JSON.parse(response);
            }
            
        } catch (error) {
            console.log(error)
            return "getCarts: error"
        }
    }


    async addCart ({products, pid, quantity}) {
        try {
        const cart = {
            products,
            pid,
            quantity
        }


        if(this.carts.length>0) {
            let nextId = this.carts[this.carts.length-1].id+1

            cart.id = nextId
        } else {
            cart.id = 1
        }

        this.carts.push(cart)

        let cartsJSON = JSON.stringify(this.carts, null, 2)

        await fs.promises.writeFile(this.path, cartsJSON)

        console.log("Created cart id: " + cart.id)
        return "cart id " + cart.id
    } 
    catch(error) {
        console.log(error)
        return "addCart: error"
    } }

//----------------------------------------

    async getCartById (id) {
        const carts = await this.getCarts();
        let oneCart = carts.find (el => el.id === id)
        if (!oneCart) {
            console.log("cart not found")
            return "cart not found"
            
        } else {
            console.log("getCartById; " + oneCart)
            return oneCart
            
        }
        
    } catch(error) {
        console.log(error)
        return "getCartById: error"
    }
//------------------------------------------------------

readCarts() {
    return this.carts
}

readCart(id) {
    let oneCart = this.carts.find(el=>el.id===id)
    console.log(oneCart)
    return oneCart
    

}

}
let cartManager = new CartManager("./data/cartData.json")
// async function cartManager () {

//     await cartManager.addCart({products : "bici 1", pid : 1, quantity : 2})
//     await cartManager.addCart({products : "bici 2", pid : 2, quantity: 1})
//     await cartManager.addCart({products : "bici 3", pid : 3, quantity: 6})
//     await cartManager.addCart({products : "bici 4", pid : 4, quantity: 1})
//     await cartManager.getCartById(3)
// }

// cartManager()


export default cartManager;