"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAds = void 0;
var get_ads_1 = __importDefault(require("./get-ads"));
var use_cases_1 = require("../../use-cases");
var validators_1 = require("../validators");
exports.getAds = get_ads_1.default(use_cases_1.makeAdsList, new validators_1.SearchAdsRequestValidator());
//# sourceMappingURL=index.js.map