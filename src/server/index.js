"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var configs_1 = require("./configs/configs");
/* import MongoUtils from "./utils/MongoUtils";
MongoUtils.initialiseMongo();
import mongoose from "./db/mongoose"; */
var app = express();
var server = require("http").createServer(app);
// defining static files
app.use("/js", express.static("./dist/client/js"));
app.use("/css", express.static("./dist/client/css"));
app.use("/fonts", express.static("./dist/client/fonts"));
app.use("/images", express.static("./dist/client/images"));
app.use("/serve", express.static("./dist/client/"));
// app configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
server.listen(configs_1.PORT, function (err) {
    if (err) {
        console.log("Could not start server");
    }
    else {
        console.log("Server successfully started on " + configs_1.PORT);
    }
});
