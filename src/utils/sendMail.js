
import nodemailer from "nodemailer"
import config from "../config/config.js"

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.gmailUserApp,
        pass: config.gmailPassApp
    }
})

const sendMail = async () => {
    
    return await transport.sendMail({
        from: 'Coder Test <dflorencia07@gmail.com>',
        to: 'dflorencia07@gmail.com',
        subject: 'Correo electrónico de prueba',
        html: `<h1>Esto es un correo de prueba</h1>`,
        // attachments: [{
        //     filename: 'nodejs.png',
        //     path: __dirname+'/nodejs.png',
        //     cid: 'nodejs'
        // }]
    })
}

export {sendMail}