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
var AdTypes_1 = require("../ads/AdTypes");
var list_ads_1 = __importDefault(require("./list-ads"));
var FakeQueryHandler = /** @class */ (function () {
    function FakeQueryHandler(data) {
        var _this = this;
        this.getAdsService = function (query) {
            return new Promise(function (resolve, reject) {
                if (_this.Data instanceof Error) {
                    reject(_this.Data);
                }
                if (typeof _this.Data === "object") {
                    resolve([_this.Data]);
                }
            });
        };
        this.Data = data;
    }
    return FakeQueryHandler;
}());
var FakeQuery = null;
describe("List Ads", function () {
    it("should list ads", function () { return __awaiter(void 0, void 0, void 0, function () {
        var successAdResponse, makeAdsList, query, AdsResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    successAdResponse = {
                        title: "This is a test ad",
                        description: "Description of Test Ad",
                        url: "https://test-ad.test",
                        price: 200,
                        image: "http://image-1.com",
                        location: "Toronto",
                        adType: AdTypes_1.AdTypes.OFFERED,
                        date: new Date(),
                    };
                    FakeQuery = new FakeQueryHandler(successAdResponse);
                    makeAdsList = list_ads_1.default(FakeQuery);
                    query = {
                        queryString: "test",
                        location: "TORONTO",
                        category: "TEST",
                    };
                    return [4 /*yield*/, makeAdsList(query)];
                case 1:
                    AdsResults = _a.sent();
                    expect(AdsResults.length).toBe(1);
                    expect(AdsResults[0].getAdType()).toBe(AdTypes_1.AdTypes.OFFERED);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Should Throw Error", function () { return __awaiter(void 0, void 0, void 0, function () {
        var makeAdsList, query;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    FakeQuery = new FakeQueryHandler(new Error("Bad Data"));
                    makeAdsList = list_ads_1.default(FakeQuery);
                    query = {
                        queryString: "test",
                        location: "TORONTO",
                        category: "TEST",
                    };
                    return [4 /*yield*/, expect(makeAdsList(query)).rejects.toThrow("Bad Data")];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=list-ads.spec.js.map