import express from "express";
import { handle } from "../lib/error";
import MahasiswaServices from "../services/mahasiswa.services";
import { Mahasiswa } from "@prisma/client";
const routes = express
  .Router()
  .get("/", async (req, res) => {
    const [data, error] = (await handle(() =>
      MahasiswaServices.get({ many: true })
    )) as [Mahasiswa[] | null, Error | null];
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
      MahasiswaServices.get({ id: parseInt(req.params.id) })
    )) as [Mahasiswa | null, Error | null];
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
      MahasiswaServices.create(req.body)
    )) as [Mahasiswa | null, Error | null];
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
      MahasiswaServices.update(parseInt(req.params.id), req.body)
    )) as [Mahasiswa | null, Error | null];
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
      MahasiswaServices.delete(parseInt(req.params.id))
    )) as [Mahasiswa | null, Error | null];
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
