export default class CartRepository {
    constructor(dao){
        this.dao = dao

    }

    get = async ()=> {
        let result = await this.dao.get()
        return result 
    }
    getById = async (cid)=> {
        let result = await this.dao.getById(cid)
        return result 
    }
    create = async ()=> {
        let result = await this.dao.create()
        return result 
    }
    update = async (cid, data)=> {
        let result = await this.dao.update(cid, data)
        return result 
    }
    delete = async (cid)=> {
        let result = await this.dao.delete(cid)
        return result 
    }
}