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
            return 201
            
        } else {
            this.carts = JSON.parse(fs.readFileSync(path, "utf-8"))
            console.log("data recovered")
            return 200
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


    async addCart ({pid, quantity}) {
        try {
        let data = {
            products : [{pid, quantity}]
            // por ahora vacío hay que añadir objetos con pid y quantity
        }


        if(this.carts.length>0) {
            let nextId = this.carts[this.carts.length-1].id+1
            data.id = nextId
        } else {
            data.id = 1
        }

        this.carts.push(data)

        let dataJSON = JSON.stringify(this.carts, null, 2)

        await fs.promises.writeFile(this.path, dataJSON)

        console.log("Created cart id: " + data.id)
        return 201
    } 
    catch(error) {
        console.log(error)
        return null
    } }

//-------------------------------------------

readCarts() {
    return this.carts
}

readCart(id) {
    let oneCart = this.carts.find(el=>el.id===id)
    return oneCart
    

}

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

async updateCart(id, data) {
    try {
        let one = this.readCart(id)
        for(let prop in data) {
            one[prop] = data[prop]
        }
        
        
        let dataJSON = JSON.stringify(this.carts, null, 2)
        await fs.promises.writeFile(this.path, dataJSON)
        console.log("updated cart: " + id)
        return 200
    } catch (error) {
        console.log(error)
        return null
    }

}

async deleteCart(id) {
    try {
        let one = this.carts.find(el=>el.id===id)
        if (one) {
            this.carts = this.carts.filter(el=>el.id!==id)
            let dataJSON = JSON.stringify(this.carts, null, 2)
            await fs.promises.writeFile(this.path, dataJSON)
            console.log("deleted Cart: " + id)
            return 200
        }
        console.log("not found")
        return null
        
    } catch (error) {
        console.log(error)
        return null
    }
}



}
let manager = new CartManager("./src/data/carts.json")


// async function cartManager () {
//     await manager.addCart({ pid : 1, quantity: 4})
//     await manager.addCart({ pid : 2, quantity: 1})
//     await manager.addCart({ pid : 3, quantity: 6})
//     await manager.addCart({ pid : 4, quantity: 1})
//     await manager.getCartById(3)
// }

// cartManager()


export default manager;