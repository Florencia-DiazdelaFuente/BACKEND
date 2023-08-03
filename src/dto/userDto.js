export default class UserDTO {
    constructor(user){
        this.firstName = user.nombre
        this.lastName  = user.apellido
        // this.fullName  = `${user.nombre} ${user.apellido}`
        this.email      = user.email
        this.password   = user.password
    }
}