"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var kijijivalidator;
describe("Kijiji Query handler", function () {
    beforeAll(function () {
        var fakeQueryValidator = /** @class */ (function () {
            function fakeQueryValidator() {
            }
            fakeQueryValidator.prototype.validateQuery = function (query) {
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
                    validatedQuery.maxPrice = 200;
                }
                if (!validatedQuery.queryString) {
                    validatedQuery.queryString = "";
                }
                return validatedQuery;
            };
            return fakeQueryValidator;
        }());
        kijijivalidator = new fakeQueryValidator();
    });
    it("it should validate required field location", function () {
        var q1 = {
            location: "",
            category: "",
        };
        expect(function () { return kijijivalidator.validateQuery(q1); }).toThrow("Location is required");
    });
    it("it should validate required field category", function () {
        var q1 = {
            location: "TORONTO",
            category: "",
        };
        expect(function () { return kijijivalidator.validateQuery(q1); }).toThrow("Category is required");
    });
    it("should default values for non-mandatory fields", function () {
        var q1 = {
            location: "TORONTO",
            category: "MUSIC",
        };
        expect(kijijivalidator.validateQuery(q1).maxResults).toBe(20);
        expect(kijijivalidator.validateQuery(q1).maxPrice).toBe(200);
        expect(kijijivalidator.validateQuery(q1).queryString).toBe("");
    });
});
//# sourceMappingURL=validator.spec.js.map