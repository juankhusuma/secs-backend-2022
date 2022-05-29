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
const express_1 = __importDefault(require("express"));
const error_1 = require("../lib/error");
const send_1 = __importDefault(require("../lib/send"));
const dosen_services_1 = __importDefault(require("../services/dosen.services"));
const routes = express_1.default
    .Router()
    .get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data, error] = (yield (0, error_1.handle)(() => dosen_services_1.default.get({ many: true })));
    return (0, send_1.default)(res, data, error);
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data, error] = (yield (0, error_1.handle)(() => dosen_services_1.default.get({ id: parseInt(req.params.id) })));
    return (0, send_1.default)(res, data, error);
}))
    // .post("/", async (req, res) => {
    //   const [data, error] = (await handle(() =>
    //     DosenServices.create(req.body)
    //   )) as [Dosen | null, Error | null];
    //   return send(res, data, error);
    // })
    .put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data, error] = (yield (0, error_1.handle)(() => dosen_services_1.default.update(parseInt(req.params.id), req.body)));
    return (0, send_1.default)(res, data, error);
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const [data, error] = (yield (0, error_1.handle)(() => dosen_services_1.default.delete(parseInt(req.params.id))));
    return (0, send_1.default)(res, data, error);
}));
exports.default = routes;
