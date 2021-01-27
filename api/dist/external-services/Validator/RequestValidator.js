"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RequestQueryValidator = /** @class */ (function () {
    function RequestQueryValidator() {
    }
    RequestQueryValidator.prototype.validateQuery = function (query) {
        var validatedQuery = query;
        if (!validatedQuery.location || validatedQuery.location === "") {
            throw new Error("Location is required");
        }
        if (!validatedQuery.category || validatedQuery.category === "") {
            throw new Error("Category is required");
        }
        if (!validatedQuery.maxResults || validatedQuery.maxResults === 0) {
            validatedQuery.maxResults = 20;
        }
        if (!validatedQuery.maxPrice || validatedQuery.maxPrice === 0) {
            validatedQuery.maxPrice = undefined;
        }
        if (!validatedQuery.queryString) {
            validatedQuery.queryString = "";
        }
        return validatedQuery;
    };
    return RequestQueryValidator;
}());
exports.default = RequestQueryValidator;
//# sourceMappingURL=RequestValidator.js.map