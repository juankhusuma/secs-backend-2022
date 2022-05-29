"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
}, (payload, done) => {
    try {
        return done(null, payload.user);
    }
    catch (error) {
        return done(error);
    }
}));
