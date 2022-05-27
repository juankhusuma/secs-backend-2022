import express from "express";
import { handle } from "../lib/error";
import { Dosen } from "@prisma/client";
import send from "../lib/send";
import DosenServices from "../services/dosen.services";
const routes = express
  .Router()
  .get("/", async (_, res) => {
    const [data, error] = (await handle(() =>
      DosenServices.get({ many: true })
    )) as [Dosen[] | null, Error | null];
    return send(res, data, error);
  })
  .get("/:id", async (req, res) => {
    const [data, error] = (await handle(() =>
      DosenServices.get({ id: parseInt(req.params.id) })
    )) as [Dosen | null, Error | null];
    return send(res, data, error);
  })
  // .post("/", async (req, res) => {
  //   const [data, error] = (await handle(() =>
  //     DosenServices.create(req.body)
  //   )) as [Dosen | null, Error | null];
  //   return send(res, data, error);
  // })
  .put("/:id", async (req, res) => {
    const [data, error] = (await handle(() =>
      DosenServices.update(parseInt(req.params.id), req.body)
    )) as [Dosen | null, Error | null];
    return send(res, data, error);
  })
  .delete("/:id", async (req, res) => {
    const [data, error] = (await handle(() =>
      DosenServices.delete(parseInt(req.params.id))
    )) as [Dosen | null, Error | null];
    return send(res, data, error);
  });

export default routes;
