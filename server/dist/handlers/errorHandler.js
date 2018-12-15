"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (err, req, res, next) {
    console.error(err);
    res.status(500).end();
};
