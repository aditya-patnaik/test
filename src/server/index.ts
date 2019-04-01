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
import ChainCodeService from "./services/ChainCodeService";
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
        res.status(500).json(err);
    })
})

app.post("/deepPurple/api/confirmEmail", (req, res) => {
    const confirmEmailUrl = DEEP_PURPLE_API_HOST + ":" + DEEP_PURPLE_API_PORT + "/" + "api/confirmEmail";
    ApiUtils.apiPostRequest(confirmEmailUrl, req.body).then((apiResponse: Response) => {
        res.status(200).json(apiResponse);
    }).catch((err: any) => {
        res.status(500).json(err);
    })
})

app.post("/deepPurple/api/registerUser", (req, res) => {
    const confirmEmailUrl = DEEP_PURPLE_API_HOST + ":" + DEEP_PURPLE_API_PORT + "/" + "api/registerUser";
    ApiUtils.apiPostRequest(confirmEmailUrl, req.body).then((apiResponse: Response) => {
        res.status(200).json(apiResponse);
    }).catch((err: any) => {
        res.status(500).json(err);
    })
})

app.get("/getUserProfile", authenticationMiddleware(), (req, res) => {
    ChainCodeService.getUserProfile(req.user).then((userProfile: any) => {
        res.status(200).json(userProfile);
    }).catch((err: any) => {
        res.status(500).json(err);
    })
})

app.get("/getAccessibleEmrs", authenticationMiddleware(), (req, res) => {
    ChainCodeService.getAccessibleEmrs(req.user).then((emrs: any) => {
        res.status(200).json(emrs);
    }).catch((err: any) => {
        res.status(500).json(err);
    })
})

app.get("/getEmrById", authenticationMiddleware(), (req, res) => {
    ChainCodeService.getEmrById(req.user, req.query.emrId).then((emrs: any) => {
        res.status(200).json(emrs);
    }).catch((err: any) => {
        res.status(500).json(err);
    })
})

app.post("/saveEmr", authenticationMiddleware(), (req, res) => {
    let emr = req.body;
    let emrId = req.query.emrId;
    ChainCodeService.saveEmr(emr, emrId, req.user).then((emrs: any) => {
        res.status(200).json(emrs);
    }).catch((err: any) => {
        res.status(500).json(err);
    })
})

app.post("/getUserFromUsername", authenticationMiddleware(), (req, res) => {
    ChainCodeService.getUserFromUsername(req.body).then((userQueryResponse: any) => {
        res.status(200).json(userQueryResponse);
    }).catch((err: any) => {
        res.status(500).json(err);
    })
})

app.post("/deepPurple/api/shareDoctor", authenticationMiddleware(), (req, res) => {
    ChainCodeService.shareEmrWithDoctor(req.body).then((userQueryResponse: any) => {
        res.status(200).json(userQueryResponse);
    }).catch((err: any) => {
        res.status(500).json(err);
    })
})

app.post("/deepPurple/api/sharePharmacy", authenticationMiddleware(), (req, res) => {
    ChainCodeService.shareEmrWithPharmacy(req.body).then((userQueryResponse: any) => {
        res.status(200).json(userQueryResponse);
    }).catch((err: any) => {
        res.status(500).json(err);
    })
})

app.post("/deepPurple/api/shareLab", authenticationMiddleware(), (req, res) => {
    ChainCodeService.shareEmrWithLab(req.body).then((userQueryResponse: any) => {
        res.status(200).json(userQueryResponse);
    }).catch((err: any) => {
        res.status(500).json(err);
    })
})

app.post("/login", passport.authenticate("local"), (req, res) => {
    res.status(200).json(req.user);
})

app.get("/logout", (req, res, next) => {
    req.logout();
    res.redirect("/login");
})

app.get("/login", (req, res) => {
    if (req.user) res.redirect("/")
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

