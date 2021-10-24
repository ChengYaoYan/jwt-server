"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var register_1 = __importDefault(require("./routes/register"));
var app = (0, express_1.default)();
app.get('/register', register_1.default);
app.listen(5005, function () { return console.log('Server started on port 5000.'); });
