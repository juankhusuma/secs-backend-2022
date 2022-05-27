import express from "express";
import { handle } from "../lib/error";
import DosenServices from "../services/dosen.services";
import { hash } from "bcryptjs";
import send from "../lib/send";

const routes = express.Router().post("/register", async (req, res) => {
  let { name, NIP, username, password } = req.body;
  password = await hash(password, 12);
  const [data, error] = await handle(async () =>
    DosenServices.create({ Role: "DOSEN", name, username, password, NIP })
  );
  return send(res, data, error);
});
export default routes;
