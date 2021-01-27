"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AdTypes_1 = require("./AdTypes");
var ads_1 = __importDefault(require("./ads"));
var DateValidator = /** @class */ (function () {
    function DateValidator() {
    }
    DateValidator.prototype.isDateValid = function (dateString) {
        return true;
    };
    return DateValidator;
}());
var urlChecker = /** @class */ (function () {
    function urlChecker() {
        this.checkURL = this.checkURL.bind(this);
    }
    urlChecker.prototype.checkURL = function (url) {
        if (!url)
            return false;
        var urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
        var result = urlRegex.test(url);
        return result;
    };
    return urlChecker;
}());
var IdGenerator = /** @class */ (function () {
    function IdGenerator() {
        this.generate = this.generate.bind(this);
    }
    IdGenerator.prototype.generate = function (input) {
        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 20; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };
    return IdGenerator;
}());
describe("Ads", function () {
    it("Should Create Ads", function () {
        var adsMaker = ads_1.default(new urlChecker(), new IdGenerator(), new DateValidator());
        var fakeAd = {
            title: "Fake Title",
            url: "https://google.com/",
            date: new Date(),
        };
        var Ads = adsMaker(fakeAd);
        expect(Ads.getTitle()).toBe("Fake Title");
        expect(Ads.getAdType()).toBe(AdTypes_1.AdTypes.OFFERED);
        expect(Ads.getId()).toBeTruthy();
    });
    it("Should Validate Ad Created", function () {
        var URLChecker = new urlChecker();
        var adsMaker = ads_1.default(URLChecker, new IdGenerator(), new DateValidator());
        var fakeAd = {
            url: "httttttp://thunderbolt.com",
            title: "Title 2",
        };
        expect(function () { return adsMaker(fakeAd); }).toThrowError("Provide a valid url");
        expect(function () { return adsMaker({}); }).toThrowError("Title is required");
        expect(function () { return adsMaker({ title: "Test1" }); }).toThrowError("URL Should be provided");
    });
});
//# sourceMappingURL=ads.spec.js.map