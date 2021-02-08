"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var buildMakeQuery = function (validator, hashFunction) {
    return function makeQuery(query) {
        var _a = validator.validate(query), isValid = _a.isValid, message = _a.message;
        if (!isValid && message) {
            throw new Error(message);
        }
        if (!isValid && !message) {
            throw new Error("The Query is Invalid!");
        }
        var searchQuery = {
            getQueryId: function () { return ""; },
            getLocation: function () { return query.location.toUpperCase(); },
            getCategory: function () { return query.category.toUpperCase(); },
            getMaxPrice: function () { return query.maxPrice || 5000; },
            getQueryString: function () { return query.queryString || ""; },
        };
        searchQuery.getQueryId = function () {
            return hashFunction.generate("" + searchQuery.getLocation() + searchQuery.getCategory() + searchQuery
                .getMaxPrice()
                .toString() + searchQuery.getQueryString().toLowerCase());
        };
        return Object.freeze(searchQuery);
    };
};
exports.default = buildMakeQuery;
//# sourceMappingURL=query.js.map