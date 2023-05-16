import { Router } from "express"

const formRouter = Router()

formRouter.get('/new_product', async(req,res,next)=> {
    try {
        return res.render('form',
        {
            title: 'form',
        })
    } catch(error) {
        next(error)
    }
})

export default formRouter