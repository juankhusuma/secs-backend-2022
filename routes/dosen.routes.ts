import express from "express";
import DosenServices from "../services/dosen.services";
import { handle } from "../lib/error";
import { Dosen } from "@prisma/client";
const routes = express
  .Router()
  .get("/", async (_, res) => {
    const [data, error] = (await handle(() =>
      DosenServices.get({ many: true })
    )) as [Dosen[] | null, Error | null];
    if (error)
      return res.status(500).json({
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    return res.json(data);
  })
  .get("/:id", async (req, res) => {
    const [data, error] = (await handle(() =>
      DosenServices.get({ id: parseInt(req.params.id) })
    )) as [Dosen | null, Error | null];
    if (error)
      return res.status(500).json({
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    return res.json(data);
  })
  .post("/", async (req, res) => {
    const [data, error] = (await handle(() =>
      DosenServices.create(req.body)
    )) as [Dosen | null, Error | null];
    if (error)
      return res.status(500).json({
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    return res.json(data);
  })
  .put("/:id", async (req, res) => {
    const [data, error] = (await handle(() =>
      DosenServices.update(parseInt(req.params.id), req.body)
    )) as [Dosen | null, Error | null];
    if (error)
      return res.status(500).json({
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    return res.json(data);
  })
  .delete("/:id", async (req, res) => {
    const [data, error] = (await handle(() =>
      DosenServices.delete(parseInt(req.params.id))
    )) as [Dosen | null, Error | null];
    if (error)
      return res.status(500).json({
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    return res.json(data);
  });

export default routes;
