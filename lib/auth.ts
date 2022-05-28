import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import DosenServices from "../services/dosen.services";
import { handle } from "./error";
import { config } from "dotenv";
config();

passport.use(
  new Strategy(
    {
      secretOrKey: process.env.JWT_SECRET as string,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (payload, done) => {
      try {
        return done(null, payload.user);
      } catch (error) {
        return done(error);
      }
    }
  )
);
