import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import { PORT } from "./configs/configs";
/* import MongoUtils from "./utils/MongoUtils";
MongoUtils.initialiseMongo();
import mongoose from "./db/mongoose"; */
const app = express();
const server = require("http").createServer(app);

// defining static files
app.use("/js", express.static("./dist/client/js"))
app.use("/css", express.static("./dist/client/css"))
app.use("/fonts", express.static("./dist/client/fonts"))
app.use("/images", express.static("./dist/client/images"))
app.use("/serve", express.static("./dist/client/"))

// app configurations
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./../client/index.html"));
})

server.listen(PORT, (err: Error) => {
    if (err) {
        console.log(`Could not start server`);
    } else {
        console.log(`Server successfully started on ${PORT}`);
    }
})

