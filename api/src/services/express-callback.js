"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var makeExpressCallback = function (controller) {
    return function (req, res) {
        var httpRequest = {
            headers: {
                "Content-Type": req.get("Content-Type"),
                Referer: req.get("referer"),
                "User-Agent": req.get("User-Agent"),
            },
            body: req.body,
            params: req.params,
            query: req.query,
            ip: req.ip,
            method: req.method,
            path: req.path,
        };
        controller(httpRequest)
            .then(function (httpResponse) {
            if (httpResponse.headers)
                res.set(httpResponse.headers);
            res.type("json");
            res.status(httpResponse.statusCode).send(httpResponse.body);
        })
            .catch(function (e) {
            return res.status(500).send({ error: "An unknown error has occured" });
        });
    };
};
exports.default = makeExpressCallback;
//# sourceMappingURL=express-callback.js.map