"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var searchSchema = joi_1.default.object({
    location: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    search: joi_1.default.string().required(),
    maxPrice: joi_1.default.number(),
});
var SearchAdsRequestValidtor = /** @class */ (function () {
    function SearchAdsRequestValidtor() {
    }
    SearchAdsRequestValidtor.prototype.validateRequest = function (request) {
        var _a = searchSchema.validate(request.query), value = _a.value, error = _a.error;
        console.log(value);
        if (error)
            throw new Error(error.message);
    };
    return SearchAdsRequestValidtor;
}());
exports.default = SearchAdsRequestValidtor;
//# sourceMappingURL=searchAdsRequestValidator.js.map