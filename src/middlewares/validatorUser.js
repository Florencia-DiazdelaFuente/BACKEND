function validator (req, res, next) { 
    const {name, password, email} = req.body
    if(!name || !password || !email) {
    return res.status(400).json({
        success: false, message: "name, email and password are required"})
    } 
    else {next()}
}

export default validator