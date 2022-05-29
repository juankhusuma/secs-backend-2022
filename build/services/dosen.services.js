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
class DosenServices {
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { Role } = data, rest = __rest(data, ["Role"]);
            return yield prisma_1.default.dosen.create({
                data: rest,
            });
        });
    }
    static get(conf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (conf.many) {
                const data = yield prisma_1.default.dosen.findMany({
                    include: {
                        Dosen_MataKuliah: {
                            select: {
                                MataKuliah: true,
                            },
                        },
                    },
                });
                return data.map((_a) => {
                    var { Dosen_MataKuliah, password } = _a, Dosen = __rest(_a, ["Dosen_MataKuliah", "password"]);
                    return (Object.assign(Object.assign({}, Dosen), { MataKuliah: Dosen_MataKuliah.map(({ MataKuliah }) => (Object.assign({}, MataKuliah))) }));
                });
            }
            const include = {
                include: {
                    Dosen_MataKuliah: {
                        select: {
                            MataKuliah: true,
                        },
                    },
                },
            };
            const data = yield prisma_1.default.dosen.findUnique(Object.assign({ where: { id: conf.id } }, include));
            if (data) {
                const { Dosen_MataKuliah, password } = data, Dosen = __rest(data, ["Dosen_MataKuliah", "password"]);
                return Object.assign(Object.assign({}, Dosen), { MataKuliah: Dosen_MataKuliah.map(({ MataKuliah }) => (Object.assign({}, MataKuliah))) });
            }
            return data;
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.dosen.update({
                where: { id },
                data,
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.dosen.delete({
                where: { id },
            });
        });
    }
}
exports.default = DosenServices;
