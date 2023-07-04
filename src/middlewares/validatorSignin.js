export default function validatorSignin (req,res,next) {
    const { password,email } = req.body
    if (!password || !email) {
        return res.status(400).json({
            success: false,
            message: 'email and password are required'
        })
    } else {
        return next()
    }
}