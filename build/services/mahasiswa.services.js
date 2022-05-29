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
const prisma_1 = __importDefault(require("../lib/prisma"));
class MahasiswaServices {
    //Create
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.mahasiswa.create({
                data,
            });
        });
    }
    // Read
    static get(conf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (conf.many) {
                const data = yield prisma_1.default.mahasiswa.findMany({
                    include: {
                        Mahasiswa_MataKuliah: {
                            select: {
                                MataKuliah: {
                                    select: {
                                        id: true,
                                        name: true,
                                        code: true,
                                        jadwal: true,
                                    },
                                },
                            },
                        },
                    },
                });
                return data.map((_a) => {
                    var { Mahasiswa_MataKuliah } = _a, Mahasiswa = __rest(_a, ["Mahasiswa_MataKuliah"]);
                    return (Object.assign(Object.assign({}, Mahasiswa), { MataKuliah: Mahasiswa_MataKuliah.map(({ MataKuliah }) => (Object.assign({}, MataKuliah))) }));
                });
            }
            const data = yield prisma_1.default.mahasiswa.findUnique({
                where: { id: conf.id },
                include: {
                    Mahasiswa_MataKuliah: {
                        select: {
                            MataKuliah: {
                                select: {
                                    id: true,
                                    name: true,
                                    code: true,
                                    jadwal: true,
                                },
                            },
                        },
                    },
                },
            });
            if (data) {
                const { Mahasiswa_MataKuliah } = data, rest = __rest(data, ["Mahasiswa_MataKuliah"]);
                return Object.assign(Object.assign({}, rest), { MataKuliah: Mahasiswa_MataKuliah.map(({ MataKuliah }) => (Object.assign({}, MataKuliah))) });
            }
            return data;
        });
    }
    // Update
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.mahasiswa.update({
                where: { id },
                data,
            });
        });
    }
    // Delete
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.mahasiswa.delete({
                where: { id },
            });
        });
    }
}
exports.default = MahasiswaServices;
