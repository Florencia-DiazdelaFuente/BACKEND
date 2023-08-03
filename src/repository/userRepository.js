export default class UserRepository {
    constructor(dao){
        this.dao = dao
    }

    get = async ()=> {
        let result = await this.dao.get()
        return result 
    }
    getById = async (uid)=> {
        let result = await this.dao.getById(uid)
        return result 
    }
    create = async ()=> {
        let result = await this.dao.create()
        return result 
    }
    update = async (uid, updatedUser)=> {
        let result = await this.dao.update(uid, updatedUser)
        return result 
    }
    delete = async (uid)=> {
        let result = await this.dao.delete(uid)
        return result 
    }
}