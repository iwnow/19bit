"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var helmet = require("helmet");
var routes_1 = require("./routes");
var handlers_1 = require("./handlers");
var app = express();
// external middlewares
app.use([
    helmet(),
    bodyParser.json()
]);
// api controllers
app.use('/api', routes_1.v1);
app.use([
    handlers_1.notFoundHandler,
    handlers_1.errorHandler
]);
exports.default = app;
