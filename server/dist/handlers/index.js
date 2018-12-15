"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notFoundHandler_1 = require("./notFoundHandler");
exports.notFoundHandler = notFoundHandler_1.default;
var errorHandler_1 = require("./errorHandler");
exports.errorHandler = errorHandler_1.default;
var allHandlers = [
    notFoundHandler_1.default,
    errorHandler_1.default
];
exports.allHandlers = allHandlers;
