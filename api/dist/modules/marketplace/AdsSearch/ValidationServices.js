"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationCAValidator = void 0;
var canada = require("canada");
var cities = canada.cities.map(function (cityData) { return cityData[0]; });
var LocationCAValidator = /** @class */ (function () {
    function LocationCAValidator() {
    }
    LocationCAValidator.getInstance = function () {
        if (this._instance)
            return this._instance;
        this._instance = new LocationCAValidator();
        return this._instance;
    };
    LocationCAValidator.prototype.validateLocation = function (location) {
        return cities.includes(location.toUpperCase());
    };
    return LocationCAValidator;
}());
exports.LocationCAValidator = LocationCAValidator;
//# sourceMappingURL=ValidationServices.js.map