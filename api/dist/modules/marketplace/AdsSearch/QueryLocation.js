"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Result_1 = require("../../../shared/core/Result");
var lodash_1 = __importDefault(require("lodash"));
var QueryLocation = /** @class */ (function () {
    function QueryLocation(location) {
        this._location = location;
    }
    QueryLocation.create = function (location, locationValidationService) {
        var _location = location ? location.trim().toLowerCase() : null;
        if (lodash_1.default.isNil(_location) || lodash_1.default.isEmpty(_location)) {
            return Result_1.Result.fail("City is required");
        }
        if (!locationValidationService.validateLocation(location)) {
            return Result_1.Result.fail("Your location is not supported");
        }
        var queryLocation = new QueryLocation(_location.toLowerCase());
        return Result_1.Result.ok(queryLocation);
    };
    return QueryLocation;
}());
exports.default = QueryLocation;
//# sourceMappingURL=QueryLocation.js.map