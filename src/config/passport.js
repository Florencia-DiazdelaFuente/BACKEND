import passport from "passport"
import {Strategy} from "passport-local"
import GHStrategy from "passport-github2"
import User from "../dao/models/User.js"

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

    passport.use( "register", 
                new Strategy(
                {passReqToCallback: true, usernameField: "email"},
                async(req, username, password, done) => {
                    try {
                        let one = await User.findOne({email: username})
                        if (!one) {
                            let user = await User.create(req.body)
                            return done(null, user)
                        }
                        return done(null, false)
                    } catch (error) {
                        return done(error, false)
                    }
                }
    ))

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
}