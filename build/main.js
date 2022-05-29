"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const dosen_routes_1 = __importDefault(require("./routes/dosen.routes"));
const mahasiswa_routes_1 = __importDefault(require("./routes/mahasiswa.routes"));
const mataKuliah_routes_1 = __importDefault(require("./routes/mataKuliah.routes"));
const assignment_routes_1 = __importDefault(require("./routes/assignment.routes"));
const remove_routes_1 = __importDefault(require("./routes/remove.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const dotenv_1 = require("dotenv");
const gradient_string_1 = require("gradient-string");
const dosen_validators_1 = __importDefault(require("./validators/dosen.validators"));
const mahasiswa_validators_1 = __importDefault(require("./validators/mahasiswa.validators"));
const mataKuliah_validators_1 = __importDefault(require("./validators/mataKuliah.validators"));
require("./lib/auth");
const passport_1 = __importDefault(require("passport"));
const guards_1 = __importDefault(require("./lib/guards"));
(0, dotenv_1.config)();
exports.app = (0, express_1.default)();
const port = process.env.PORT || 5500;
// Middlewares
exports.app.use((0, morgan_1.default)("dev"));
// app.use(helmet());
exports.app.use(body_parser_1.default.json());
var reqCount = 0;
exports.app.use((req, _, next) => {
    console.log((0, gradient_string_1.cristal)(`
    Request[${reqCount}] >> ${req.method} ${req.url}
    `));
    req.body && console.table(req.body);
    reqCount++;
    next();
});
exports.app.use(passport_1.default.authenticate("jwt", { session: false }));
// Validation Guards
// Dosen Routes Validation
exports.app
    .get("/dosen/:id", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.basic, dosen_validators_1.default.checkId)
    .post("/dosen", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.basic, dosen_validators_1.default.checkBody)
    .post("/auth/register", dosen_validators_1.default.checkBody)
    .put("/dosen/:id/", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.admin, dosen_validators_1.default.checkId, dosen_validators_1.default.checkUpdatePayload)
    .delete("/dosen/:id", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.admin, dosen_validators_1.default.checkId);
// Mahasiswa Routes Validations
exports.app
    .get("/mahasiswa", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.basic)
    .get("/mahasiswa/:id", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.basic, mahasiswa_validators_1.default.checkId)
    .post("/mahasiswa", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.basic, mahasiswa_validators_1.default.checkBody)
    .put("/mahasiswa/:id", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.basic, mahasiswa_validators_1.default.checkId, mahasiswa_validators_1.default.checkUpdatePayload)
    .delete("/mahasiswa/:id", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.basic, mahasiswa_validators_1.default.checkId);
// Mata Kuliah Routes Validations
exports.app
    .get("/mata-kuliah", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.basic)
    .get("/mata-kuliah/:id", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.basic, mataKuliah_validators_1.default.checkId)
    .post("/mata-kuliah", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.admin, mataKuliah_validators_1.default.checkBody)
    .put("/mata-kuliah/:id", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.admin, mataKuliah_validators_1.default.checkId, mataKuliah_validators_1.default.checkUpdatePayload)
    .delete("/mata-kuliah/:id", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.admin, mataKuliah_validators_1.default.checkId)
    .put("/mata-kuliah/:id/mahasiswa", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.admin, mataKuliah_validators_1.default.checkMahasiswaUpdateId)
    .put("/mata-kuliah/:id/dosen", passport_1.default.authenticate("jwt", { session: false }), guards_1.default.admin, mataKuliah_validators_1.default.checkDosenUpdateId);
// Routes
exports.app
    .use("/dosen", dosen_routes_1.default)
    .use("/mahasiswa", mahasiswa_routes_1.default)
    .use("/mata-kuliah", mataKuliah_routes_1.default)
    .use("/mata-kuliah", assignment_routes_1.default)
    .use("/mata-kuliah", remove_routes_1.default)
    .use("/auth", auth_routes_1.default);
exports.app.get("/", guards_1.default.dosen, (req, res) => {
    res.json({
        user: req.user,
    });
});
exports.app.listen(port, () => console.log((0, gradient_string_1.retro)(`Server listening on port:${port}`)));
