"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdsQuery = void 0;
var Result_1 = require("../../../shared/core/Result");
var AdsQuery = /** @class */ (function () {
    function AdsQuery(queryRaw, idGenerator) {
        var stringyQuery = "" + queryRaw.location._location + queryRaw.query._query + JSON.stringify(queryRaw.filters);
        this._id = idGenerator.generate(stringyQuery);
        this._location = queryRaw.location._location;
        this._query = queryRaw.query._query;
        this._filters = queryRaw.filters;
    }
    Object.defineProperty(AdsQuery.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdsQuery.prototype, "location", {
        get: function () {
            return this._location;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdsQuery.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AdsQuery.prototype, "query", {
        get: function () {
            return this._query;
        },
        enumerable: false,
        configurable: true
    });
    AdsQuery.create = function (query, idGenerator) {
        return Result_1.Result.ok(new AdsQuery(query, idGenerator));
    };
    return AdsQuery;
}());
exports.AdsQuery = AdsQuery;
//# sourceMappingURL=AdsQuery.js.map