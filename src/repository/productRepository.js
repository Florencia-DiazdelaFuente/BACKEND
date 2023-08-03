export default class ProductRepository {
    constructor(dao){
        this.dao = dao

    }

    get = async ()=> {
        let result = await this.dao.get()
        return result 
    }
    getById = async (pid)=> {
        let result = await this.dao.getById(pid)
        return result 
    }
    create = async (data)=> {
        let result = await this.dao.create(data)
        return result 
    }
    update = async (pid, data)=> {
        let result = await this.dao.update(pid, data)
        return result 
    }
    delete = async (pid)=> {
        let result = await this.dao.delete(pid)
        return result 
    }
}