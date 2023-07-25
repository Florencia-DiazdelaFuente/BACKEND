import passport from "passport"
import {Strategy} from "passport-local"
import GHStrategy from "passport-github2"
import User from "../dao/Mongo/models/User.js"
import jwt from "passport-jwt"

const {GH_CLIENT_ID, GH_CLIENT_SECRET} = process.env
const callback = "http://localhost:8080/api/auth/github/callback"


export default function () {
    passport.serializeUser(
        (user,done) => done(null, user._id)
    )
    passport.deserializeUser(
        async(id, done) => {
            const user = await User.findById(id)
            return done(null, user)
        }
    )
// ESTRATEGIA DE REGISTRO
    passport.use( "register", 
                new Strategy(
                {passReqToCallback: true, usernameField: "email"},
                async(req, username, password, done) => {
                    try {
                        let one = await User.findOne({email: username})
                        if (one) {
                            return done(null, false)
                        } else {
                            let user = await User.create(req.body)
                            delete user.password         // para el registro no es necesario inyectar la constraseña a la propiedad user del obj de requerimiento
                            return done(null, user)
                        } 
                        
                        
                    } catch (error) {
                        return done(error, false)
                    }
                }
    ))
// ESTRATEGIA DE INICIO DE SESIÓN
    passport.use(
        'signin',
        new Strategy(
            { usernameField:'email' },
            async (username,password,done) => {
                try {
                    let one = await User.findOne({ email:username })
                    if (one) {
                        return done(null,one)
                    }
                    return done(null,false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(
        "github",
        new GHStrategy(
            {clientID: GH_CLIENT_ID, clientSecret: GH_CLIENT_SECRET, callbackURL: callback },
            async(accessToken, refreshToken, profile, done) => {
                try {
                    console.log(profile)
                    let one = await User.findOne({email: profile._json.login})
                    if(one) {
                        return done(null, one)
                    }
                    let user = await User.create({
                        name: profile._json.name,
                        email: profile._json.login,
                        photo: profile._json.avatar_url,
                        age: 18,
                        password:"hola1234"
                    })
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )

    passport.use(      //estrategia para AUTENTICAR usuarios
        "jwt",
        new jwt.Strategy(
            {secretOrKey:process.env.SECRET_JWT, jwtFromRequest:jwt.ExtractJwt.fromExtractors([(req)=> req?.cookies["token"]])},
            async(jwt_payload, done) => {
                try {
                    let one = await User.findOne({email:jwt_payload.email})
                    if (one) {
                        delete one.password
                        return done(null, one)
                    } else{
                        return done(null, false)
                    }
                } catch (error) {
                    return done(error,false)
                }
            }
        )
    )
}