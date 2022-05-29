"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function send(res, data, error) {
    if (error)
        return res.status(500).json({
            status: "Failed",
            code: 500,
            error: { message: error.message },
        });
    return res.status(200).json({ status: "Success", code: 200, data });
}
exports.default = send;
