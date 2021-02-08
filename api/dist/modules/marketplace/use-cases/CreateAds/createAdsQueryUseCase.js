"use strict";
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
exports.CreateAdsQueryUseCase = void 0;
var QueryLocation_1 = __importDefault(require("../../AdsSearch/QueryLocation"));
var QueryString_1 = __importDefault(require("../../AdsSearch/QueryString"));
var ValidationServices_1 = require("../../AdsSearch/ValidationServices");
var AdsQuery_1 = require("../../AdsSearch/AdsQuery");
var index_1 = require("../../utils/index");
var Result_1 = require("../../../../shared/core/Result");
var CreateAdsQueryUseCase = /** @class */ (function () {
    function CreateAdsQueryUseCase(adsRepo) {
        this.execute = this.execute.bind(this);
        this._adsRepo = adsRepo;
    }
    CreateAdsQueryUseCase.prototype.toDomain = function (request) {
        var locationValidator = ValidationServices_1.LocationCAValidator.getInstance();
        var qLocation = QueryLocation_1.default.create((request === null || request === void 0 ? void 0 : request.location) || "", locationValidator);
        if (!qLocation.isSuccess) {
            return Result_1.Result.fail(qLocation.message);
        }
        var qString = QueryString_1.default.create((request === null || request === void 0 ? void 0 : request.query) || "");
        if (!qString.isSuccess) {
            return Result_1.Result.fail(qString.message);
        }
        var AdQuery = AdsQuery_1.AdsQuery.create({
            location: qLocation.getValue(),
            query: qString.getValue(),
            filters: {
                maxPrice: (request === null || request === void 0 ? void 0 : request.maxPrice) || 9999,
                category: (request === null || request === void 0 ? void 0 : request.category) || "",
                maxResults: (request === null || request === void 0 ? void 0 : request.maxResults) || 20,
            },
        }, new index_1.IdGenerator());
        return AdQuery;
    };
    CreateAdsQueryUseCase.prototype.execute = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var AdQuery, saveResult, val;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!request) {
                            Result_1.Result.fail("Request cannot be empty");
                        }
                        AdQuery = this.toDomain(request);
                        if (!AdQuery.isSuccess) {
                            return [2 /*return*/, Result_1.Result.fail(AdQuery.message)];
                        }
                        return [4 /*yield*/, this._adsRepo.save(AdQuery.getValue())];
                    case 1:
                        saveResult = _a.sent();
                        if (!saveResult) {
                            return [2 /*return*/, Result_1.Result.fail("Your Query was not saved!")];
                        }
                        val = undefined;
                        return [2 /*return*/, Result_1.Result.ok(val)];
                }
            });
        });
    };
    return CreateAdsQueryUseCase;
}());
exports.CreateAdsQueryUseCase = CreateAdsQueryUseCase;
//# sourceMappingURL=createAdsQueryUseCase.js.map