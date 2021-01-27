"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAdsList = void 0;
var kijiji_1 = __importDefault(require("../external-services/provider/kijiji"));
var list_ads_1 = __importDefault(require("./list-ads"));
exports.makeAdsList = list_ads_1.default(new kijiji_1.default());
//# sourceMappingURL=index.js.map