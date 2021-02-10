"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var Result_1 = require("../../../shared/core/Result");
var uuid_by_string_1 = __importDefault(require("uuid-by-string"));
var User = /** @class */ (function () {
    function User(props, id) {
        this._props = props;
        this._id = id;
    }
    Object.defineProperty(User.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "props", {
        get: function () {
            return this._props;
        },
        enumerable: false,
        configurable: true
    });
    User.generateId = function (input) {
        return uuid_by_string_1.default(input, 3);
    };
    User.create = function (userprops) {
        var user = new User(userprops, this.generateId(userprops.email.emailId));
        return Result_1.Result.ok(user);
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map