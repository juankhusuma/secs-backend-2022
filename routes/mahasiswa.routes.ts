import express from "express";
import { handle } from "../lib/error";
import MahasiswaServices from "../services/mahasiswa.services";
import { Mahasiswa } from "@prisma/client";
import send from "../lib/send";
const routes = express
  .Router()
  .get("/", async (_, res) => {
    const [data, error] = (await handle(() =>
      MahasiswaServices.get({ many: true })
    )) as [Mahasiswa[] | null, Error | null];
    return send(res, data, error);
  })
  .get("/:id", async (req, res) => {
    const [data, error] = (await handle(() =>
      MahasiswaServices.get({ id: parseInt(req.params.id) })
    )) as [Mahasiswa | null, Error | null];
    return send(res, data, error);
  })
  .post("/", async (req, res) => {
    const [data, error] = (await handle(() =>
      MahasiswaServices.create(req.body)
    )) as [Mahasiswa | null, Error | null];
    return send(res, data, error);
  })
  .put("/:id", async (req, res) => {
    const [data, error] = (await handle(() =>
      MahasiswaServices.update(parseInt(req.params.id), req.body)
    )) as [Mahasiswa | null, Error | null];
    return send(res, data, error);
  })
  .delete("/:id", async (req, res) => {
    const [data, error] = (await handle(() =>
      MahasiswaServices.delete(parseInt(req.params.id))
    )) as [Mahasiswa | null, Error | null];
    return send(res, data, error);
  });

export default routes;
