import express from "express";
import { handle } from "../lib/error";
import DosenServices from "../services/dosen.services";
import { hash, compare } from "bcryptjs";
import send from "../lib/send";
import jwt from "jsonwebtoken";
import { Dosen } from "@prisma/client";
import { config } from "dotenv";
import prisma from "../lib/prisma";
config();

const routes = express
  .Router()
  .post("/register", async (req, res) => {
    let { name, NIP, username, password } = req.body;
    password = await hash(password, 12);
    const [data, error] = await handle(() =>
      DosenServices.create({ Role: "DOSEN", name, username, password, NIP })
    );
    return send(res, data, error);
  })
  .post("/login", async (req, res) => {
    const { username, password } = req.body;
    let [data, error] = await handle(() =>
      prisma.dosen.findUnique({ where: { username } })
    );
    if (data) {
      const { password: pass, ...rest } = data as Dosen;
      if (await compare(password, pass)) {
        const token = jwt.sign(
          {
            user: rest,
          },
          process.env.JWT_SECRET as string,
          { expiresIn: "7d" }
        );
        return res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
          })
          .json({
            user: rest,
            token,
          });
      }
      return send(res, null, {
        name: "Auth Error: Invalid Password",
        message: "Wrong password",
      });
    }
    return res.status(500).json({
      error:
        "An error occured when logging in, make sure the username and password is correct",
    });
  });
export default routes;
