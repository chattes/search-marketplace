"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var controllers_1 = require("./services/controllers");
var express_callback_1 = __importDefault(require("./services/express-callback"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var appInsights = require("applicationinsights");
appInsights.setup().start();
var client = appInsights.defaultClient;
var app = express_1.default();
var port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
app.get("/", function (req, res) {
    res.send("Hello Kijiji Express Watcher");
});
app.get("/ads/search");
app.use("/ads/search", express_callback_1.default(controllers_1.getAds));
app
    .listen(port, function () {
    client.trackEvent({ name: "Server has Started", properties: { port: port } });
    return console.log("Server Listening on " + port);
})
    .on("error", function (err) {
    client.trackException({ exception: err });
    return console.log(err);
});
//# sourceMappingURL=app.js.map