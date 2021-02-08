"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateValidator = exports.IdGenerator = exports.urlChecker = void 0;
var valid_url_1 = __importDefault(require("valid-url"));
var crypto_1 = __importDefault(require("crypto"));
var moment_1 = __importDefault(require("moment"));
var urlChecker = /** @class */ (function () {
    function urlChecker() {
    }
    urlChecker.prototype.checkURL = function (url) {
        var urlToCheck = !!url ? url : "";
        var isValid = valid_url_1.default.isUri(urlToCheck) ? true : false;
        return isValid;
    };
    return urlChecker;
}());
exports.urlChecker = urlChecker;
var IdGenerator = /** @class */ (function () {
    function IdGenerator() {
    }
    IdGenerator.prototype.generate = function (input) {
        if (input) {
            return crypto_1.default.createHash("sha256").update(input).digest("hex");
        }
        // TODO Better Id Generation
        return crypto_1.default
            .createHash("sha256")
            .update("RandomTitle" + new Date().toISOString())
            .digest("hex");
    };
    return IdGenerator;
}());
exports.IdGenerator = IdGenerator;
var dateValidator = /** @class */ (function () {
    function dateValidator() {
    }
    dateValidator.prototype.isDateValid = function (dateString) {
        var mDate = moment_1.default(dateString);
        return mDate.isValid();
    };
    return dateValidator;
}());
exports.dateValidator = dateValidator;
//# sourceMappingURL=index.js.map