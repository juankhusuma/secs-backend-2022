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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
class DosenValidator {
    static checkBody(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, NIP, password, username, Role } = req.body;
                if (!name || name === "")
                    throw new Error("Name is required");
                if (name.length < 3)
                    throw new Error("Name is too short (3+ characters is required)");
                if (!NIP || NIP === "")
                    throw new Error("NIP is required");
                let user = yield prisma_1.default.dosen.findUnique({ where: { NIP } });
                if (user)
                    throw new Error("NIP already in use");
                if (!username || username === "")
                    throw new Error("Username is required");
                if (username.length <= 3)
                    throw new Error("Username is too short (3+ characters is required)");
                if (/[A-Z]/.test(username))
                    throw new Error("Username must not contain uppercase letters");
                user = yield prisma_1.default.dosen.findUnique({ where: { username } });
                if (user)
                    throw new Error("Username already in use");
                if (!password || password === "")
                    throw new Error("Password is required");
                if (Role && Role !== "DOSEN" && Role !== "ADMIN")
                    throw new Error("Role could only be either DOSEN or ADMIN");
                else {
                    req.body.Role = "DOSEN";
                }
                // Checks if the password is secure enough
                if (password.length < 8)
                    throw new Error("Password is too short (8+ characters is required)");
                if (!password.match(/[A-Z]/))
                    throw new Error("Password must contain at least 1 uppercase letter");
                if (!password.match(/[a-z]/))
                    throw new Error("Password must contain at least 1 lowercase letter");
                if (!password.match(/\d/))
                    throw new Error("Password must contain at least 1 number");
                if (!password.match(/[^A-Za-z0-9]/))
                    throw new Error("Password must contain at least 1 special character");
                return next();
            }
            catch (error) {
                return res.status(500).json({
                    status: "Failed",
                    code: 500,
                    error: { message: error.message },
                });
            }
        });
    }
    static checkId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const total = yield prisma_1.default.dosen.count();
                if (Number.isNaN(parseInt(id)))
                    throw new Error("Invalid ID in the route parameter, (ID must be a number)");
                if (parseInt(id) > total)
                    throw new Error("This Dosen does not exist");
                return next();
            }
            catch (error) {
                return res.status(500).json({
                    status: "Failed",
                    code: 500,
                    error: { message: error.message },
                });
            }
        });
    }
    static checkUpdatePayload(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, NIP, password, username, Role } = req.body;
                if (name) {
                    console.log(name.length);
                    if (name.length < 3)
                        throw new Error("Name is too short (3+ characters is required)");
                }
                else if (name === "")
                    throw new Error("Name could not be set to an empty string");
                if (NIP) {
                    let user = yield prisma_1.default.dosen.findUnique({ where: { NIP } });
                    if (user)
                        throw new Error("NIP already in use");
                }
                else if (NIP === "") {
                    throw new Error("NIP could not be set to an empty string");
                }
                if (username) {
                    if (username.length < 3)
                        throw new Error("Username is too short (3+ characters is required)");
                    if (username.match(/[A-Z]/))
                        throw new Error("Username must not contain uppercase letters");
                    let user = yield prisma_1.default.dosen.findUnique({ where: { username } });
                    if (user)
                        throw new Error("Username already in use");
                }
                else if (username === "") {
                    throw new Error("Username could not be set to an empty string");
                }
                if (password) {
                    if (password.length < 8)
                        throw new Error("Password is too short (8+ characters is required)");
                    if (!password.match(/[A-Z]/))
                        throw new Error("Password must contain at least 1 uppercase letter");
                    if (!password.match(/[a-z]/))
                        throw new Error("Password must contain at least 1 lowercase letter");
                    if (!password.match(/\d/))
                        throw new Error("Password must contain at least 1 number");
                    if (!password.match(/[^A-Za-z0-9]/))
                        throw new Error("Password must contain at least 1 special character");
                }
                else if (password === "") {
                    throw new Error("Password could not be set to an empty string");
                }
                if (Role && Role !== "DOSEN" && Role !== "ADMIN")
                    throw new Error("Role could only be either DOSEN or ADMIN");
                return next();
            }
            catch (error) {
                return res.status(500).json({
                    status: "Failed",
                    code: 500,
                    error: { message: error.message },
                });
            }
        });
    }
}
exports.default = DosenValidator;