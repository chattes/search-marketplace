"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdTypes_1 = require("./AdTypes");
var buildMakeAds = function (urlChecker, idGenerator, dateValidator) {
    return function makeAds(ads) {
        if (!ads.title)
            throw new Error("Title is required");
        if (!ads.url)
            throw new Error("URL Should be provided");
        if (!urlChecker.checkURL(ads.url))
            throw new Error("Provide a valid url");
        if (!ads.date || !dateValidator.isDateValid(ads.date)) {
            throw new Error("A date must be provided");
        }
        var Ads = Object.freeze({
            getId: function () {
                var _a;
                return ads.id ||
                    idGenerator.generate("" + ads.title + ((_a = ads.date) === null || _a === void 0 ? void 0 : _a.toISOString()));
            },
            getTitle: function () { return ads.title || ""; },
            getDescription: function () { return ads.description || ""; },
            getImage: function () { return ads.image || ""; },
            getDate: function () { return ads.date || new Date(); },
            getLocation: function () { return ads.location || ""; },
            getPrice: function () { return ads.price || 0; },
            getAdType: function () { return ads.adType || AdTypes_1.AdTypes.OFFERED; },
            getUrl: function () { return ads.url || ""; },
        });
        return Ads;
    };
};
exports.default = buildMakeAds;
//# sourceMappingURL=ads.js.map