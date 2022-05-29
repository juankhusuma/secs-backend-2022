"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
function handle(fn) {
    return fn()
        .then((data) => [data, null])
        .catch((error) => [null, error]);
}
exports.handle = handle;
