import * as passport from "passport"
import * as LocalStrategy from "passport-local"

export const BootstrapPassport = () => {
    passport.serializeUser((user: any, callback: any) => {
        callback(null, user.email)
    })

    passport.deserializeUser((user: any, callback: any) => {
        callback(user, callback)
    })

    passport.use(new LocalStrategy.Strategy((username, password, done) => {
        let User = { name: "Aditya" }
        return done(null, User)
    }))
}