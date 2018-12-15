"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
router.get('/user', function (req, res) {
    res.json({
        user: 'test'
    });
});
router.get('/file', function (req, res) {
    res.send({
        data: 'test'
    });
});
router.post('/generate-file', function (req, res) {
    res.send({
        data: 'test'
    });
});
var v1 = express.Router();
v1.use('/v1', router);
exports.default = v1;
