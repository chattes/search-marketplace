"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var kijiji_scraper_1 = require("kijiji-scraper");
var AdTypes_1 = require("../../ads/AdTypes");
var RequestValidator_1 = __importDefault(require("../Validator/RequestValidator"));
var AdTypes_2 = require("../../ads/AdTypes");
var DateValidator = /** @class */ (function () {
    function DateValidator() {
    }
    DateValidator.prototype.isDateValid = function (dateString) {
        return moment_1.default(dateString).isValid();
    };
    return DateValidator;
}());
var GetKijijiAds = /** @class */ (function () {
    function GetKijijiAds() {
        this.getAdsService = this.getAdsService.bind(this);
        this.searchAds = this.searchAds.bind(this);
        this.validate = this.validate.bind(this);
        this.mapCategories = this.mapCategories.bind(this);
        this.mapLocation = this.mapLocation.bind(this);
    }
    GetKijijiAds.prototype.getAdsService = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var queryKijiji, validatedQuery, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryKijiji = __assign(__assign({}, query), {
                            location: this.mapLocation(query.location),
                            category: this.mapCategories(query.category),
                        });
                        validatedQuery = this.validate(queryKijiji);
                        return [4 /*yield*/, this.searchAds(validatedQuery)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results
                                .filter(function (kijijiAd) {
                                var dValidator = new DateValidator();
                                return dValidator.isDateValid(new Date(kijijiAd.date));
                            })
                                .map(function (result) {
                                var _a, _b, _c;
                                var searchResult = {};
                                searchResult.title = result.title;
                                searchResult.date = new Date(result.date);
                                searchResult.description = result.description;
                                searchResult.image = result.image;
                                searchResult.url = result.url;
                                searchResult.price = ((_a = result === null || result === void 0 ? void 0 : result.attributes) === null || _a === void 0 ? void 0 : _a.price) || 0;
                                searchResult.adType = ((_b = result === null || result === void 0 ? void 0 : result.attributes) === null || _b === void 0 ? void 0 : _b.type) || AdTypes_1.AdTypes.OFFERED;
                                searchResult.location = ((_c = result === null || result === void 0 ? void 0 : result.attributes) === null || _c === void 0 ? void 0 : _c.location) || "Unknown";
                                return searchResult;
                            })];
                }
            });
        });
    };
    GetKijijiAds.prototype.mapLocation = function (location) {
        switch (location) {
            case AdTypes_2.Location.TORONTO:
                return kijiji_scraper_1.locations.ONTARIO.TORONTO_GTA;
            case AdTypes_2.Location.BARRIE:
                return kijiji_scraper_1.locations.ONTARIO.BARRIE;
            case AdTypes_2.Location.GUELPH:
                return kijiji_scraper_1.locations.ONTARIO.GUELPH;
            default:
                return kijiji_scraper_1.locations;
        }
    };
    GetKijijiAds.prototype.mapCategories = function (category) {
        switch (category) {
            case AdTypes_2.Categories.CARS:
                return kijiji_scraper_1.categories.CARS_AND_VEHICLES;
            case AdTypes_2.Categories.HOUSE:
                return kijiji_scraper_1.categories.REAL_ESTATE;
            default:
                return kijiji_scraper_1.categories;
        }
    };
    GetKijijiAds.prototype.searchAds = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var params, searchOptions, results, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        params = {
                            locationId: query.location,
                            categoryId: query.category,
                            maxPrice: query.maxPrice,
                            // adType: "OFFER",
                            q: query.queryString,
                        };
                        searchOptions = {
                            maxResults: query.maxResults || 20,
                            scrapeResultDetails: true,
                            pageDelayMs: 1500,
                        };
                        return [4 /*yield*/, kijiji_scraper_1.search(params, searchOptions)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, results];
                    case 2:
                        error_1 = _a.sent();
                        // TODO - Generic logger - Research Hot To - Dependency Inversion/injection??
                        console.log(error_1);
                        return [2 /*return*/, []];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GetKijijiAds.prototype.validate = function (query) {
        var validator = new RequestValidator_1.default();
        return validator.validateQuery(query);
    };
    return GetKijijiAds;
}());
exports.default = GetKijijiAds;
//# sourceMappingURL=kijiji.js.map