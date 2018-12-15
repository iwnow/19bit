"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Example:
 * app.use(asyncMiddleware(async (req, res, next) => {
 * 	await ....
 * 	next();
 * }));
 */
exports.asyncMiddleware = function (fn) {
    return function (req, res, next) {
        return Promise
            .resolve(fn(req, res, next))
            .catch(next);
    };
};
