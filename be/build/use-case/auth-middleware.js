"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const bcrypt_util_1 = require("util/bcrypt.util");
const verifyToken = (req, res, next) => {
    const access_token = req.cookies['access-token'];
    if (access_token) {
        const res = (0, bcrypt_util_1.verify)(access_token);
        if (res)
            next();
    }
    else {
        return res.sendStatus(401);
    }
};
exports.verifyToken = verifyToken;
