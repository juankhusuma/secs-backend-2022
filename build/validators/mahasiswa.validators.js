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
class MahasiswaValidator {
    static checkBody(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, NIM } = req.body;
                if (!name || name === "")
                    throw new Error("Name is required");
                if (name.length < 3)
                    throw new Error("Name is too short (3+ characters is required)");
                if (!NIM || NIM === "")
                    throw new Error("NIP is required");
                let mahasiswa = yield prisma_1.default.mahasiswa.findUnique({ where: { NIM } });
                if (mahasiswa)
                    throw new Error("NIM already in use");
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
                const total = yield prisma_1.default.mahasiswa.count();
                if (Number.isNaN(parseInt(id)))
                    throw new Error("Invalid ID in the route parameter, (ID must be a number)");
                if (parseInt(id) > total)
                    throw new Error("This Mahasiswa does not exist");
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
                const { name, NIM } = req.body;
                if (name) {
                    console.log(name.length);
                    if (name.length < 3)
                        throw new Error("Name is too short (3+ characters is required)");
                }
                else if (name === "")
                    throw new Error("Name could not be set to an empty string");
                if (NIM) {
                    let mahasiswa = yield prisma_1.default.mahasiswa.findUnique({ where: { NIM } });
                    if (mahasiswa)
                        throw new Error("NIP already in use");
                }
                else if (NIM === "") {
                    throw new Error("NIP could not be set to an empty string");
                }
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
exports.default = MahasiswaValidator;
