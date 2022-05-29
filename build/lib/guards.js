"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Guard {
    static admin(req, res, next) {
        if ((req === null || req === void 0 ? void 0 : req.user).Role === "ADMIN") {
            return next();
        }
        return res.status(403).json({
            status: "Unauthorized",
            code: 403,
        });
    }
    static dosen(req, res, next) {
        console.log(req.user, "Admin Guard");
        if ((req === null || req === void 0 ? void 0 : req.user).Role === "DOSEN") {
            return next();
        }
        return res.status(403).json({ status: "Unauthorized", code: 403 });
    }
    static basic(req, res, next) {
        console.log(req.user, "Basic Guard");
        if ((req === null || req === void 0 ? void 0 : req.user).Role === "ADMIN" ||
            (req === null || req === void 0 ? void 0 : req.user).Role === "DOSEN") {
            return next();
        }
        return res.status(403).json({ status: "Unauthorized", code: 403 });
    }
}
exports.default = Guard;
