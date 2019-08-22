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
import { HttpClient } from 'aurelia-fetch-client';
//TODO Cookie instead of localStorage
var ApiService = /** @class */ (function () {
    function ApiService() {
        var _this = this;
        this.baseUrl = "https://localhost:44319/api";
        this.accessToken = "";
        this._refreshToken = "";
        this._isAuthenticated = false;
        this.shouldRetry = true;
        this.httpClient = new HttpClient();
        this.httpClient.configure(function (config) {
            config.withBaseUrl(_this.baseUrl);
            config.withDefaults({ credentials: 'same-origin' });
            config.withInterceptor({
                response: function (response) {
                    return response;
                },
                responseError: function (error) {
                    return error;
                }
            });
        });
    }
    Object.defineProperty(ApiService.prototype, "currentUserId", {
        //auth 
        get: function () {
            return (this.persistStorage ? localStorage.getItem('currentUserId') : sessionStorage.getItem('currentUserId'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiService.prototype, "isAuthenticated", {
        get: function () {
            return (this.persistStorage ? localStorage.getItem('access_token') != null || this._isAuthenticated :
                sessionStorage.getItem('access_token') != null || this._isAuthenticated);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApiService.prototype, "currentUserAccessToken", {
        get: function () {
            return (this.persistStorage ? localStorage.getItem("access_token") : sessionStorage.getItem("access_token"));
        },
        enumerable: true,
        configurable: true
    });
    //
    ApiService.prototype.get = function (input) {
        return this.fetch(input);
    };
    ApiService.prototype.post = function (input, body) {
        if (body === void 0) { body = {}; }
        var init = {
            method: "post",
            body: JSON.stringify(body)
        };
        return this.fetch(input, init);
    };
    ApiService.prototype.download = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var init;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        init = {
                            method: "get"
                        };
                        init.headers = {};
                        return [4 /*yield*/, this.fetch(input, init)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.upload = function (input, body) {
        if (body === void 0) { body = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var init;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        init = {
                            method: "post",
                            body: body
                        };
                        init.headers = {};
                        return [4 /*yield*/, this.fetch(input, init)];
                    case 1: 
                    // init.headers["Content-Type"] = "multipart/form-data";
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.put = function (input, body) {
        if (body === void 0) { body = {}; }
        var init = {
            method: "put",
            body: JSON.stringify(body)
        };
        return this.fetch(input, init);
    };
    ApiService.prototype.patch = function (input, body) {
        if (body === void 0) { body = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var init;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        init = {
                            method: "PATCH",
                            body: JSON.stringify(body)
                        };
                        return [4 /*yield*/, this.fetch(input, init)];
                    case 1: 
                    // init.headers = {'Content-Type':'application/x-www-form-urlencoded'};
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ApiService.prototype.delete = function (input) {
        var init = {
            method: "delete"
        };
        return this.fetch(input, init);
    };
    ApiService.prototype.deleteAll = function (input) {
        return __awaiter(this, void 0, void 0, function () {
            var init;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        init = {
                            method: "delete"
                        };
                        return [4 /*yield*/, this.fetch(input, init)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // private fetch(input: Request | string, init: RequestInit = {}) {
    //   return this.httpClient.fetch(input, init)
    //     .then(async httpResponse => {
    //       this.shouldRetry = true;
    //       return httpResponse.json();
    //     })
    //     .catch(errors => errors);
    // }
    //
    ApiService.prototype.fetch = function (input, init) {
        var _this = this;
        if (init === void 0) { init = {}; }
        init.headers = {}; // otherwise headers are undefined
        if (this.isAuthenticated) {
            if (this.persistStorage) {
                init.headers["Authorization"] = "Bearer " + localStorage.getItem('access_token');
            }
            else {
                init.headers["Authorization"] = "Bearer " + sessionStorage.getItem('access_token');
            }
        }
        return this.httpClient.fetch(input, init)
            .then(function (httpResponse) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(httpResponse.status === 401 && this.shouldRetry && this.isAuthenticated)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.refreshToken()];
                    case 1:
                        _a.sent();
                        this.shouldRetry = false;
                        return [2 /*return*/, this.fetch(input, init)];
                    case 2:
                        this.shouldRetry = true;
                        return [2 /*return*/, httpResponse.json()];
                }
            });
        }); })
            .catch(function (errors) { return errors; });
    };
    ApiService.prototype.getCurrentUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetch("/users/me")];
                    case 1:
                        currentUser = _a.sent();
                        this._currentUserId = currentUser.id;
                        // this._isAdmin = currentUser.isAdmin;
                        if (this.persistStorage) {
                            localStorage.setItem("currentUserId", this._currentUserId);
                            // localStorage.setItem('isAdmin', String(this._isAdmin));
                        }
                        else {
                            sessionStorage.setItem("currentUserId", this._currentUserId);
                            // sessionStorage.setItem('isAdmin', String(this._isAdmin));
                        }
                        return [2 /*return*/, currentUser];
                }
            });
        });
    };
    //auth
    ApiService.prototype.authenticate = function (request) {
        if (request === void 0) { request = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.grant_type = "password";
                        return [4 /*yield*/, this.httpClient
                                .fetch("/auth/token", {
                                method: "post",
                                body: JSON.stringify(request)
                            })
                                .then(function (httpResponse) { return httpResponse.json(); })];
                    case 1:
                        response = _a.sent();
                        this.accessToken = response.access_token;
                        this._refreshToken = response.refresh_token;
                        if (this.accessToken === undefined || this._refreshToken === undefined) {
                            return [2 /*return*/];
                        }
                        if (this.persistStorage) {
                            localStorage.setItem('access_token', this.accessToken);
                            localStorage.setItem('refresh_token', this._refreshToken);
                        }
                        else {
                            sessionStorage.setItem('access_token', this.accessToken);
                            sessionStorage.setItem('refresh_token', this._refreshToken);
                        }
                        this._isAuthenticated = true;
                        return [4 /*yield*/, this.getCurrentUser()];
                    case 2:
                        _a.sent(); // write to local/session storage asap.
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ApiService.prototype.refreshToken = function (request) {
        if (request === void 0) { request = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request.grant_type = "refresh_token";
                        request.refresh_token = this._refreshToken;
                        return [4 /*yield*/, this.httpClient
                                .fetch("/auth/token", {
                                method: "post",
                                body: JSON.stringify(request)
                            })
                                .then(function (httpResponse) { return httpResponse.json(); })];
                    case 1:
                        response = _a.sent();
                        this.accessToken = response.access_token;
                        this._refreshToken = response.refresh_token;
                        if (this.persistStorage) {
                            localStorage.setItem('access_token', this.accessToken);
                            localStorage.setItem('refresh_token', this._refreshToken);
                        }
                        else {
                            sessionStorage.setItem('access_token', this.accessToken);
                            sessionStorage.setItem('refresh_token', this._refreshToken);
                        }
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ApiService.prototype.logout = function () {
        this.delete("/auth/token");
        (this.persistStorage) ? localStorage.clear() : sessionStorage.clear();
    };
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=ApiService.js.map