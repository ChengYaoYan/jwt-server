"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var register_1 = __importDefault(require("./routes/register"));
var login_1 = __importDefault(require("./routes/login"));
var users_1 = __importDefault(require("./routes/users"));
var helper_1 = require("./lib/helper");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.post("/register", register_1.default);
app.post("/login", login_1.default);
app.get("/users", helper_1.verifyToken, users_1.default);
app.listen(5005, function () { return console.log("Server started on port 5005."); });
