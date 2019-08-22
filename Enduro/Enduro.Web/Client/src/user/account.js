var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { UserAvatarChanged } from './../shared/UserAvatarChanged';
import { autoinject, observable } from "aurelia-framework";
import { ApiService } from "shared/ApiService";
import { ChangeEmailRequest } from "shared/ChangeEmailRequest";
import { ChangePasswordRequest } from "shared/ChangePasswordRequest";
import { ChangeDetailsRequest } from "shared/ChangeDetailsRequest";
import { EventAggregator } from "aurelia-event-aggregator";
var Account = /** @class */ (function () {
    function Account(api, eventAggregator) {
        this.api = api;
        this.eventAggregator = eventAggregator;
        this.genders = ["Male", "Female", "Other"];
        this.changeEmailRequest = new ChangeEmailRequest();
        this.changePasswordRequest = new ChangePasswordRequest();
        this.changeDetailsRequest = new ChangeDetailsRequest();
    }
    Account.prototype.activate = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.api.getCurrentUser()];
                    case 1:
                        response = _c.sent();
                        this.currentUserId = response.id;
                        _a = this;
                        _b = User.bind;
                        return [4 /*yield*/, this.api.get("/users/" + this.currentUserId)];
                    case 2:
                        _a.currentUser = new (_b.apply(User, [void 0, _c.sent()]))();
                        this.currentUserAvatar = this.currentUser.avatarSrc + "?" + Date.now();
                        return [2 /*return*/];
                }
            });
        });
    };
    Account.prototype.upload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var formData, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        formData = new FormData();
                        for (i = 0; i < this.selectedFiles.length; i++) {
                            formData.append("files[" + i + "]", this.selectedFiles[i]);
                        }
                        return [4 /*yield*/, this.api.upload("/upload/user", formData)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.changeUserAvatar()];
                    case 2:
                        _a.sent();
                        this.selectedFiles = null;
                        return [2 /*return*/];
                }
            });
        });
    };
    Account.prototype.changeUserAvatar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this;
                        _b = User.bind;
                        return [4 /*yield*/, this.api.get("/users/" + this.currentUserId)];
                    case 1:
                        _a.currentUser = new (_b.apply(User, [void 0, _c.sent()]))();
                        this.currentUserAvatar = this.currentUser.avatarSrc + "?" + Date.now(); //Date appendend to invalidate browser cache
                        this.eventAggregator.publish(new UserAvatarChanged(this.currentUser.avatarSrc));
                        return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        observable,
        __metadata("design:type", Object)
    ], Account.prototype, "currentUserAvatar", void 0);
    Account = __decorate([
        autoinject,
        __metadata("design:paramtypes", [ApiService, EventAggregator])
    ], Account);
    return Account;
}());
export { Account };
var User = /** @class */ (function () {
    function User(json) {
        this.id = json.id;
        this.fullName = json.fullName;
        this.email = json.email;
        this.avatarUri = json.avatarUri;
    }
    Object.defineProperty(User.prototype, "avatarSrc", {
        get: function () {
            if (this.avatarUri !== undefined) {
                return "/storage/" + this.avatarUri.container + "/" + this.avatarUri.file;
            }
        },
        enumerable: true,
        configurable: true
    });
    return User;
}());
export { User };
var AvatarUri = /** @class */ (function () {
    function AvatarUri() {
    }
    return AvatarUri;
}());
export { AvatarUri };
//# sourceMappingURL=account.js.map