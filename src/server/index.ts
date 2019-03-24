import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as path from "path";
import * as passport from "passport";
import * as session from "express-session";
import {DEEP_PURPLE_API_HOST, DEEP_PURPLE_API_PORT, PORT} from "./configs/configs";
import authenticationMiddleware from "./authentication/authenticationMiddleware";
import {BootstrapPassport} from "./authentication/BootstrapPassport";
import {ApiUtils} from "./utils/ApiUtils";
/* import MongoUtils from "./utils/MongoUtils";
MongoUtils.initialiseMongo();
import mongoose from "./db/mongoose"; */
const app = express();
const server = require("http").createServer(app);

const sessionMiddleware = (session({
    secret: "BaBoomPaChiChi",
    resave: false,
    saveUninitialized: false
}))

// defining static filesclear
app.use("/js", express.static("./dist/client/js"))
app.use("/css", express.static("./dist/client/css"))
app.use("/fonts", express.static("./dist/client/fonts"))
app.use("/images", express.static("./dist/client/images"))
app.use("/serve", express.static("./dist/client/"))

// app configurations
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(sessionMiddleware)
app.use(passport.initialize())
app.use(passport.session())

BootstrapPassport();

app.post("/deepPurple/api/registerEmail", (req, res) => {
    const registerUserUrl = DEEP_PURPLE_API_HOST + ":" + DEEP_PURPLE_API_PORT + "/" + "api/registerEmail";
    ApiUtils.apiPostRequest(registerUserUrl, req.body).then((apiResponse: Response) => {
        res.json(apiResponse).status(200)
    }).catch((err: any) => {
        res.json(err).status(500);
    })
})

app.post("/deepPurple/api/confirmEmail", (req, res) => {
    const confirmEmailUrl = DEEP_PURPLE_API_HOST + ":" + DEEP_PURPLE_API_PORT + "/" + "api/confirmEmail";
    ApiUtils.apiPostRequest(confirmEmailUrl, req.body).then((apiResponse: Response) => {
        res.json(apiResponse).status(200)
    }).catch((err: any) => {
        res.json(err).status(500);
    })
})

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./../client/login.html"))
})

app.get("*", authenticationMiddleware(), (req, res) => {
    res.sendFile(path.join(__dirname, "./../client/index.html"))
})

server.listen(PORT, (err: Error) => {
    if (err) {
        console.log(`Could not start server`);
    } else {
        console.log(`Server successfully started on ${PORT}`);
    }
})

