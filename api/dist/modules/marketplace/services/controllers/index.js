"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveQuery = exports.getAds = void 0;
var get_ads_1 = __importDefault(require("./get-ads"));
var use_cases_1 = require("../../use-cases");
var validators_1 = require("../validators");
var save_query_1 = __importDefault(require("./save-query"));
var createAdsQueryUseCase_1 = require("../../use-cases/CreateAds/createAdsQueryUseCase");
var AzureBlobAdsQuery_1 = require("../../repos/Implementation/AzureBlobAdsQuery");
exports.getAds = get_ads_1.default(use_cases_1.makeAdsList, new validators_1.SearchAdsRequestValidator());
var AdsQueryRepo = AzureBlobAdsQuery_1.AzureBlobAdsQueryRepo.getInstance();
exports.saveQuery = save_query_1.default(new createAdsQueryUseCase_1.CreateAdsQueryUseCase(AdsQueryRepo));
//# sourceMappingURL=index.js.map