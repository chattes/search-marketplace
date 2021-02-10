"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEmail = void 0;
var Result_1 = require("../../../shared/core/Result");
var UserEmail = /** @class */ (function () {
    function UserEmail(props) {
        this._emailId = props.emailId;
    }
    Object.defineProperty(UserEmail.prototype, "emailId", {
        get: function () {
            return this._emailId;
        },
        enumerable: false,
        configurable: true
    });
    UserEmail.isEmailValid = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    UserEmail.formatEmail = function (email) {
        return email.trim().toLowerCase();
    };
    UserEmail.create = function (userEmail) {
        if (!this.isEmailValid(userEmail.emailId)) {
            return Result_1.Result.fail("Email Id is not valid");
        }
        return Result_1.Result.ok(new UserEmail({ emailId: this.formatEmail(userEmail.emailId) }));
    };
    return UserEmail;
}());
exports.UserEmail = UserEmail;
//# sourceMappingURL=UserEmail.js.map