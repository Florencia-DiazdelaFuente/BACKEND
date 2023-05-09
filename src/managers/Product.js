import fs from "fs"


class ProductManager {
    
    constructor (path) {
        this.products = []
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


    async getProducts () {
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
            return "getProducts: error"
        }
    }


    async addProduct ({title, description, price, thumbnail, code, stock}) {
        try {
        const product = {
            description,
            title,
            price,
            thumbnail,
            code,
            stock,
        }


        if(this.products.length>0) {
            let nextId = this.products[this.products.length-1].id+1

            product.id = nextId
        } else {
            product.id = 1
        }

        this.products.push(product)

        let productsJSON = JSON.stringify(this.products, null, 2)

        await fs.promises.writeFile(this.path, productsJSON)

        console.log("Created product id: " + product.id)
        return "product id " + product.id
    } 
    catch(error) {
        console.log(error)
        return "addProduct: error"
    } }

//----------------------------------------

    async getProductById (id) {
        const products = await this.getProducts();
        let oneProd = products.find (el => el.id === id)
        if (!oneProd) {
            console.log("product not found")
            return "product not found"
            
        } else {
            console.log("getProductById; " + oneProd.title)
            return oneProd
            
        }
        
    } catch(error) {
        console.log(error)
        return "getProductById: error"
    }
//------------------------------------------------------

    readProducts() {
        return this.products
    }

    readProduct(id) {
        let oneProd = this.products.find(el=>el.id===id)
        console.log(oneProd)
        return oneProd
        

    }


    async updateProduct(id, data) {
        try {
            let oneProd = this.readProduct(id)

            if (!oneProd) {
                console.log("not found")
            } else {
                for(let prop in data) {
                    oneProd[prop] = data[prop]
                }
            }
            
            let dataJSON = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, dataJSON)
            console.log("update product: done")
            return "update product: done"
        } catch (error) {
            console.log(error)
            return "updateProduct: error"
        }

    }

    async deleteProduct(id) {
        try {
            this.products = this.products.filter(el => el.id !== id)
            let dataJSON = JSON.stringify(this.products, null, 2)
            await fs.promises.writeFile(this.path, dataJSON)
            console.log("deleteProduct: done")
        } catch (error) {
            console.log(error)
        return "deleteProduct: error"
        }
    }
}

let manager = new ProductManager("./src/data/products.json")

// async function manager() {
//     await manager.addProduct({title: "bici1", description: "bicicleta número 1", price: 1000, thumbnail: "img", code: "aaa111", stock: 2})
//     await manager.addProduct({title: "bici2", description: "bicicleta número 2", price: 1100, thumbnail: "img", code: "ata111", stock: 2})
//     await manager.addProduct({title: "bici3", description: "bicicleta número 3", price: 1200, thumbnail: "img", code: "afa111", stock: 2})
//     await manager.addProduct({title: "bici4", description: "bicicleta número 4", price: 1300, thumbnail: "img", code: "aba111", stock: 2})
//     await manager.addProduct({title: "bici5", description: "bicicleta número 5", price: 1400, thumbnail: "img", code: "aaa311", stock: 2})
//     await manager.addProduct({title: "bici6", description: "bicicleta número 6", price: 1500, thumbnail: "img", code: "aaa171", stock: 2})
//     await manager.addProduct({title: "bici7", description: "bicicleta número 7", price: 1600, thumbnail: "img", code: "aaa191", stock: 2})
//     await manager.addProduct({title: "bici8", description: "bicicleta número 8", price: 1700, thumbnail: "img", code: "aac111", stock: 2})
//     await manager.addProduct({title: "bici9", description: "bicicleta número 9", price: 1800, thumbnail: "img", code: "aab111", stock: 2})
//     await manager.addProduct({title: "bici10", description: "bicicleta número 10", price: 1900, thumbnail: "img", code: "qaa111", stock: 2})
//     await manager.getProductById(9)
//     await manager.updateProduct(9, {title: "bici999", description: "producto 9 modificado"})
//     await manager.deleteProduct(10)
//     await manager.getProducts()

// }
// manager()

export default manager;