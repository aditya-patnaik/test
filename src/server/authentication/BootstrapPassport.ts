import * as passport from "passport"
import * as LocalStrategy from "passport-local"
import ChainCodeService from "../services/ChainCodeService";

function checkAuth(username: string, password: string, done: any): any {
    ChainCodeService.checkAuth(username, password).then((responseBody: any) => {
        let user = JSON.parse(responseBody.msg);
        return done(null, user)
    }).catch((err: any) => {
        return done(JSON.stringify(err))
    })
}

export const BootstrapPassport = () => {
    passport.serializeUser((user: any, callback: any) => {
        callback(null, user.userName)
    })

    passport.deserializeUser((email: string, callback: any) => {
        callback(null, email)
    })

    passport.use(new LocalStrategy.Strategy((username, password, done) => {
        checkAuth(username, password, done);
    }))
}