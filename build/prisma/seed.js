"use strict";
/**
 * Script seeder untuk membuat data dummy pada database guna testing API
 */
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
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../lib/prisma"));
// Locale to IND
faker_1.faker.setLocale("id_ID");
// Populate
(() => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 20; i++) {
        yield prisma_1.default.dosen.create({
            data: {
                NIP: faker_1.faker.unique(() => faker_1.faker.random.numeric(10)),
                name: faker_1.faker.unique(faker_1.faker.name.findName),
                username: faker_1.faker.unique(() => faker_1.faker.internet.userName().toLocaleLowerCase()),
                password: faker_1.faker.unique(faker_1.faker.internet.password),
                Role: Math.random() > 0.5 ? "ADMIN" : "DOSEN",
                Dosen_MataKuliah: {
                    create: {
                        MataKuliah: {
                            create: {
                                name: faker_1.faker.unique(faker_1.faker.name.jobArea),
                                jadwal: {
                                    set: [client_1.Hari.MINGGU],
                                },
                                code: faker_1.faker.unique(() => faker_1.faker.random.alphaNumeric(5, { casing: "upper" })),
                                Mahasiswa_MataKuliah: {
                                    create: {
                                        Mahasiswa: {
                                            create: {
                                                NIM: faker_1.faker.unique(() => faker_1.faker.random.numeric(10)),
                                                name: faker_1.faker.unique(faker_1.faker.name.findName),
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
}))();
