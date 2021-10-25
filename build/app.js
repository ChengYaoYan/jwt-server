"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var register_1 = __importDefault(require("./routes/register"));
var login_1 = __importDefault(require("./routes/login"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/register", register_1.default);
app.post("/login", login_1.default);
app.listen(5005, function () { return console.log("Server started on port 5005."); });
