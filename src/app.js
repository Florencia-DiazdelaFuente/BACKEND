import express from "express"
import router from "./routes/index.js"
import errorHandler from "./middlewares/errorHandler.js"
import notFoundHandler from "./middlewares/notFound.js"
import {__dirname} from "./utils.js"
import { engine } from 'express-handlebars'


const app = express()

// TEMPLATE ENGINE
app.engine('handlebars',engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

// MIDDLEWARES
app.use('/public',express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)
app.use(errorHandler)
app.use(notFoundHandler)

export default app
