"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Result_1 = require("../../../shared/core/Result");
var lodash_1 = __importDefault(require("lodash"));
var QueryString = /** @class */ (function () {
    function QueryString(query) {
        this._query = query;
    }
    QueryString.create = function (query) {
        var _query = query ? query.trim() : null;
        if (lodash_1.default.isNil(_query) || lodash_1.default.isEmpty(_query)) {
            return Result_1.Result.fail("Query is required");
        }
        if (_query.length > 30) {
            return Result_1.Result.fail("Query cannot be greater than 30 characters");
        }
        return Result_1.Result.ok(new QueryString(_query));
    };
    return QueryString;
}());
exports.default = QueryString;
//# sourceMappingURL=QueryString.js.map