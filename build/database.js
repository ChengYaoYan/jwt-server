"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.projects = exports.users = exports.login = exports.register = void 0;
var mongodb = __importStar(require("mongodb"));
// const URL: string = process.env.MONGODB_URL as string,
// const URL = "mongodb://localhost:27017",
var URL = "mongodb://mongo:27017", dbName = "jira";
var client = new mongodb.MongoClient(URL);
function register(user) {
    return __awaiter(this, void 0, void 0, function () {
        var result, db, collections, collection, collection, userIsExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    db = client.db(dbName);
                    return [4 /*yield*/, db.listCollections().toArray()];
                case 2:
                    collections = (_a.sent()).map(function (collection) { return collection.name; });
                    if (!!collections.includes("register")) return [3 /*break*/, 4];
                    collection = db.collection("register");
                    return [4 /*yield*/, collection.insertOne(user)];
                case 3:
                    _a.sent();
                    result = {
                        isAcknowledged: true,
                        message: "register successfully",
                    };
                    return [3 /*break*/, 8];
                case 4:
                    collection = db.collection("register");
                    return [4 /*yield*/, collection.findOne({
                            name: "" + user.name,
                        })];
                case 5:
                    userIsExist = (_a.sent())
                        ? true
                        : false;
                    if (!userIsExist) return [3 /*break*/, 6];
                    result = {
                        isAcknowledged: false,
                        message: user.name + " has been registered!",
                    };
                    return [3 /*break*/, 8];
                case 6: return [4 /*yield*/, collection.insertOne(user)];
                case 7:
                    _a.sent();
                    result = {
                        isAcknowledged: true,
                        message: "register successfully",
                    };
                    _a.label = 8;
                case 8:
                    client.close();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.register = register;
function login(user) {
    return __awaiter(this, void 0, void 0, function () {
        var result, db, collection, findResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    db = client.db(dbName);
                    collection = db.collection("register");
                    return [4 /*yield*/, collection.findOne({ name: "" + user.name })];
                case 2:
                    findResult = _a.sent();
                    if (!findResult) {
                        result = {
                            isAcknowledged: false,
                            message: user.name + " doesn't exist",
                        };
                    }
                    else {
                        findResult.password === user.password
                            ? (result = { isAcknowledged: true, message: "login successfully" })
                            : (result = {
                                isAcknowledged: false,
                                message: "username or password is falsed",
                            });
                    }
                    client.close();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.login = login;
function users() {
    return __awaiter(this, void 0, void 0, function () {
        var db, collection, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    db = client.db(dbName);
                    collection = db.collection("users");
                    return [4 /*yield*/, collection
                            .find({}, { projection: { _id: 0 } })
                            .toArray()];
                case 2:
                    result = (_a.sent());
                    client.close();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.users = users;
function projects(name, username) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var result, db, projectsCollection, usersCollection, personId, personId;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    result = [];
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _c.sent();
                    db = client.db(dbName);
                    projectsCollection = db.collection("projects");
                    usersCollection = db.collection("users");
                    if (!(username === undefined && name === undefined)) return [3 /*break*/, 3];
                    return [4 /*yield*/, projectsCollection
                            .find({}, { projection: { _id: 0 } })
                            .toArray()];
                case 2:
                    result = (_c.sent());
                    return [3 /*break*/, 11];
                case 3:
                    if (!(username !== undefined && name === undefined)) return [3 /*break*/, 6];
                    return [4 /*yield*/, usersCollection.findOne({ name: username }, { projection: { id: 1 } })];
                case 4:
                    personId = (_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.id;
                    return [4 /*yield*/, projectsCollection
                            .find({ personId: personId }, { projection: { _id: 0 } })
                            .toArray()];
                case 5:
                    result = (_c.sent());
                    return [3 /*break*/, 11];
                case 6:
                    if (!(name !== undefined && username === undefined)) return [3 /*break*/, 8];
                    return [4 /*yield*/, projectsCollection
                            .find({ name: "" + name }, { projection: { _id: 0 } })
                            .toArray()];
                case 7:
                    result = (_c.sent());
                    return [3 /*break*/, 11];
                case 8: return [4 /*yield*/, usersCollection.findOne({ name: username }, { projection: { id: 1 } })];
                case 9:
                    personId = (_b = (_c.sent())) === null || _b === void 0 ? void 0 : _b.id;
                    return [4 /*yield*/, projectsCollection
                            .find({ name: "" + name, personId: personId }, { projection: { _id: 0 } })
                            .toArray()];
                case 10:
                    result = (_c.sent());
                    _c.label = 11;
                case 11:
                    client.close();
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.projects = projects;
