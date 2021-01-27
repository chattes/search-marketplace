"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var ads_1 = __importDefault(require("./ads"));
var Utils_1 = require("./Utils");
var dateValidator = /** @class */ (function () {
    function dateValidator() {
    }
    dateValidator.prototype.isDateValid = function (dateString) {
        var mDate = moment_1.default(dateString);
        return mDate.isValid();
    };
    return dateValidator;
}());
var makeAds = ads_1.default(new Utils_1.urlChecker(), new Utils_1.IdGenerator(), new dateValidator());
exports.default = makeAds;
//# sourceMappingURL=index.js.map