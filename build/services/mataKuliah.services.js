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
class MataKuliahServices {
    //Create
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.mataKuliah.create({
                data,
            });
        });
    }
    // Read
    static get(conf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (conf.many) {
                const data = yield prisma_1.default.mataKuliah.findMany({
                    include: {
                        Dosen_MataKuliah: {
                            select: {
                                Dosen: true,
                            },
                        },
                        Mahasiswa_MataKuliah: {
                            select: {
                                Mahasiswa: true,
                            },
                        },
                    },
                });
                return data.map((_a) => {
                    var { Dosen_MataKuliah, Mahasiswa_MataKuliah } = _a, MatKul = __rest(_a, ["Dosen_MataKuliah", "Mahasiswa_MataKuliah"]);
                    return (Object.assign(Object.assign({}, MatKul), { Dosen: Dosen_MataKuliah.map((dosen) => {
                            const _a = dosen.Dosen, { password } = _a, Dosen = __rest(_a, ["password"]);
                            return Dosen;
                        }), Mahasiswa: Mahasiswa_MataKuliah.map((mahasiswa) => mahasiswa.Mahasiswa) }));
                });
            }
            const data = yield prisma_1.default.mataKuliah.findUnique({
                where: { id: conf.id },
                include: {
                    Dosen_MataKuliah: {
                        select: {
                            Dosen: true,
                        },
                    },
                    Mahasiswa_MataKuliah: {
                        select: {
                            Mahasiswa: true,
                        },
                    },
                },
            });
            if (data) {
                const { Dosen_MataKuliah, Mahasiswa_MataKuliah } = data, MatKul = __rest(data, ["Dosen_MataKuliah", "Mahasiswa_MataKuliah"]);
                return Object.assign(Object.assign({}, MatKul), { Dosen: Dosen_MataKuliah.map((dosen) => {
                        const _a = dosen.Dosen, { password } = _a, Dosen = __rest(_a, ["password"]);
                        return Dosen;
                    }), Mahasiswa: Mahasiswa_MataKuliah.map((mahasiswa) => mahasiswa.Mahasiswa) });
            }
            return data;
        });
    }
    // Update
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.mataKuliah.update({
                where: { id },
                data,
            });
        });
    }
    // Delete
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.mataKuliah.delete({
                where: { id },
            });
        });
    }
    static assignMahasiswa(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.mataKuliah.update({
                where: { id: args.id },
                data: {
                    Mahasiswa_MataKuliah: {
                        create: {
                            Mahasiswa: {
                                connect: {
                                    id: args.mahasiswaId,
                                },
                            },
                        },
                    },
                },
            });
        });
    }
    static assignDosen(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.mataKuliah.update({
                where: { id: args.id },
                data: {
                    Dosen_MataKuliah: {
                        create: {
                            Dosen: {
                                connect: {
                                    id: args.dosenId,
                                },
                            },
                        },
                    },
                },
            });
        });
    }
    static removeMahasiswa(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.mataKuliah.update({
                where: { id: args.id },
                data: {
                    Mahasiswa_MataKuliah: {
                        delete: {
                            mahasiswaId_mataKuliahId: {
                                mahasiswaId: args.mahasiswaId,
                                mataKuliahId: args.id,
                            },
                        },
                    },
                },
            });
        });
    }
    static removeDosen(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.mataKuliah.update({
                where: { id: args.id },
                data: {
                    Dosen_MataKuliah: {
                        delete: {
                            dosenId_mataKuliahId: {
                                dosenId: args.dosenId,
                                mataKuliahId: args.id,
                            },
                        },
                    },
                },
            });
        });
    }
}
exports.default = MataKuliahServices;
