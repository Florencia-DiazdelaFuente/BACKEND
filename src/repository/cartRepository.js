export default class CartRepository {
    constructor(dao){
        this.dao = dao

    }

    get = async ()=> {
        let result = await this.dao.get()
        return result 
    }
    getById = async (cid)=> {
        let result = await this.dao.getById()
        return result 
    }
    create = async ()=> {
        let result = await this.dao.create()
        return result 
    }
    update = async (cid, updatedCart)=> {
        let result = await this.dao.update()
        return result 
    }
    delete = async (cid)=> {
        let result = await this.dao.delete()
        return result 
    }
}