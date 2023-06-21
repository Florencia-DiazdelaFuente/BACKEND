function validPassword (req,res,next){
    const {password} = req.body
    if (password.length < 8) {
        return res.status(400).json({
            success: false, 
            message: "password requires 8 characters minimum"})
    } else {
        next()
    }
    }
    export default validPassword