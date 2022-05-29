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
const error_1 = require("../lib/error");
const mataKuliah_services_1 = __importDefault(require("../services/mataKuliah.services"));
const express_1 = __importDefault(require("express"));
const send_1 = __importDefault(require("../lib/send"));
const routes = express_1.default
    .Router()
    .get("/", (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get all mata kuliah
    const [data, error] = (yield (0, error_1.handle)(() => __awaiter(void 0, void 0, void 0, function* () {
        return mataKuliah_services_1.default.get({ many: true });
    })));
    return (0, send_1.default)(res, data, error);
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get mata kuliah by id
    const [data, error] = (yield (0, error_1.handle)(() => {
        return mataKuliah_services_1.default.get({ id: parseInt(req.params.id) });
    }));
    return (0, send_1.default)(res, data, error);
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Create mata kuliah
    const [data, error] = (yield (0, error_1.handle)(() => {
        return mataKuliah_services_1.default.create(req.body);
    }));
    return (0, send_1.default)(res, data, error);
}))
    .put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Update mata kuliah
    const [data, error] = (yield (0, error_1.handle)(() => {
        return mataKuliah_services_1.default.update(parseInt(req.params.id), req.body);
    }));
    return (0, send_1.default)(res, data, error);
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Delete mata kuliah
    const [data, error] = (yield (0, error_1.handle)(() => {
        return mataKuliah_services_1.default.delete(parseInt(req.params.id));
    }));
    return (0, send_1.default)(res, data, error);
}));
exports.default = routes;
