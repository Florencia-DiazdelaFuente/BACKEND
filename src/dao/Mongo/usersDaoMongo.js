import Users from "./models/User.js"

export default class UsersDaoMongo {
    constructor() {
        this.usersModel = Users
    }
    get     = async (limit=10, page=1)=> await this.usersModel.paginate({ },{limit, page, lean: true})
    
    getById = async (uid) => await this.usersModel.findOne({_id: uid})
    
    create  = async (newUser)=> await this.usersModel.create(newUser)
    
    update = async (uid, userUpdate) => await this.usersModel.findOneAndUpdate({_id: uid}, userUpdate)

    delete = async (uid) => await this.usersModel.findOneAndDelete({_id: uid})

}