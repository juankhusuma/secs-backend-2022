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
class MataKuliahValidator {
    static checkBody(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, code, jadwal } = req.body;
                if (!name || name === "")
                    throw new Error("Name is required");
                let user = yield prisma_1.default.mataKuliah.findUnique({ where: { name } });
                if (user)
                    throw new Error("Name already in use");
                if (!code || code === "")
                    throw new Error("Code is required");
                user = yield prisma_1.default.mataKuliah.findUnique({ where: { code } });
                if (user)
                    throw new Error("Code already in use");
                if (!jadwal || jadwal === [])
                    throw new Error("Jadwal is required");
                const days = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
                for (let i = 0; i < jadwal.length; i++) {
                    if (!days.includes(jadwal[i].toUpperCase()))
                        throw new Error("Invalid day in jadwal. Must be one of: " + days);
                    req.body.jadwal[i] = jadwal[i].toUpperCase();
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
    static checkId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const total = yield prisma_1.default.mataKuliah.count();
                if (Number.isNaN(parseInt(id)))
                    throw new Error("Invalid ID in the route parameter, (ID must be a number)");
                if (parseInt(id) > total)
                    throw new Error("This Mata Kuliah does not exist");
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
                const { name, code, jadwal } = req.body;
                if (name) {
                    if (name === "")
                        throw new Error("Name could not be set to an empty string");
                    let matkul = yield prisma_1.default.mataKuliah.findUnique({ where: { name } });
                    if (matkul)
                        throw new Error("Name already in use");
                }
                if (code) {
                    if (code === "")
                        throw new Error("Code could not be set to an empty string");
                    let matkul = yield prisma_1.default.mataKuliah.findUnique({ where: { code } });
                    if (matkul)
                        throw new Error("Code already in use");
                }
                if (jadwal) {
                    if (jadwal === [])
                        throw new Error("Jadwal could not be set to an empty array");
                    const days = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
                    for (let i = 0; i < jadwal.length; i++) {
                        if (!days.includes(jadwal[i].toUpperCase()))
                            throw new Error("Invalid day in jadwal. Must be one of: " + days);
                        req.body.jadwal[i] = jadwal[i].toUpperCase();
                    }
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
    static checkMahasiswaUpdateId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const total = yield prisma_1.default.mataKuliah.count();
                if (Number.isNaN(parseInt(id)))
                    throw new Error("Invalid ID in the route parameter, (ID must be a number)");
                if (parseInt(id) > total)
                    throw new Error("This Mata Kuliah does not exist");
                if (!req.body.id)
                    throw new Error("Mahasiswa ID is required");
                if (Number.isNaN(parseInt(req.body.id)))
                    throw new Error("Invalid ID in the request body, (ID must be a number)");
                const totalMahasiswa = yield prisma_1.default.mahasiswa.count();
                if (parseInt(req.body.id) > totalMahasiswa)
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
    static checkDosenUpdateId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const total = yield prisma_1.default.mataKuliah.count();
                if (Number.isNaN(parseInt(id)))
                    throw new Error("Invalid ID in the route parameter, (ID must be a number)");
                if (parseInt(id) > total)
                    throw new Error("This Mata Kuliah does not exist");
                if (!req.body.id)
                    throw new Error("Dosen ID is required");
                if (Number.isNaN(parseInt(req.body.id)))
                    throw new Error("Invalid ID in the request body, (ID must be a number)");
                const totalDosen = yield prisma_1.default.dosen.count();
                if (parseInt(req.body.id) > totalDosen)
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
}
exports.default = MataKuliahValidator;
