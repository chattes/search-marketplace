"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
var lodash_1 = __importDefault(require("lodash"));
var Result = /** @class */ (function () {
    function Result(isSuccess, message, value) {
        this.isSuccess = isSuccess;
        if (isSuccess && lodash_1.default.isNull(value)) {
            throw new Error("Need value for Success");
        }
        if (!isSuccess && lodash_1.default.isEmpty(message)) {
            throw new Error("Need a message for Failure");
        }
        this.message = message;
        this.value = value;
    }
    Result.prototype.getValue = function () {
        if (this.isSuccess) {
            return this.value;
        }
        else {
            throw new Error("Cannot get value for Error");
        }
    };
    Result.ok = function (value) {
        return new Result(true, undefined, value);
    };
    Result.fail = function (errorMessage) {
        return new Result(false, errorMessage);
    };
    return Result;
}());
exports.Result = Result;
//# sourceMappingURL=Result.js.map