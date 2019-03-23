export default function authenticationMiddleware() {
    return function(req: any, res: any, next: any) {
        if (req.isAuthenticated() || req.path === "/login") {
            return next();
        } else {
            res.redirect("/login")
        }
    }
}