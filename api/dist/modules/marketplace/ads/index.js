"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ads_1 = __importDefault(require("./ads"));
var utils_1 = require("../utils");
var hashFunction = new utils_1.IdGenerator();
var makeAds = ads_1.default(new utils_1.urlChecker(), hashFunction, new utils_1.dateValidator());
exports.default = makeAds;
//# sourceMappingURL=index.js.map