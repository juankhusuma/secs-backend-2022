"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = require("../lib/error");
const dosen_services_1 = __importDefault(require("../services/dosen.services"));
const bcryptjs_1 = require("bcryptjs");
const send_1 = __importDefault(require("../lib/send"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = require("dotenv");
const prisma_1 = __importDefault(require("../lib/prisma"));
(0, dotenv_1.config)();
const routes = express_1.default
    .Router()
    .post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, NIP, username, password } = req.body;
    password = yield (0, bcryptjs_1.hash)(password, 12);
    const [data, error] = yield (0, error_1.handle)(() => dosen_services_1.default.create({ Role: "DOSEN", name, username, password, NIP }));
    return (0, send_1.default)(res, data, error);
}))
    .post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    let [data, error] = yield (0, error_1.handle)(() => prisma_1.default.dosen.findUnique({ where: { username } }));
    if (data) {
        const _a = data, { password: pass } = _a, rest = __rest(_a, ["password"]);
        if (yield (0, bcryptjs_1.compare)(password, pass)) {
            const token = jsonwebtoken_1.default.sign({
                user: rest,
            }, process.env.JWT_SECRET, { expiresIn: "7d" });
            return res
                .status(200)
                .cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24 * 7,
            })
                .json({
                user: rest,
                token,
            });
        }
        return (0, send_1.default)(res, null, {
            name: "Auth Error: Invalid Password",
            message: "Wrong password",
        });
    }
    return res.status(500).json({
        error: "An error occured when logging in, make sure the username and password is correct",
    });
}));
exports.default = routes;
