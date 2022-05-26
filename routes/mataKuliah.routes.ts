import { handle } from "../lib/error";
import MataKuliahServices from "../services/mataKuliah.services";
import express from "express";
import { MataKuliah } from "@prisma/client";

const routes = express
  .Router()
  .get("/", async (_, res) => {
    // Get all mata kuliah
    const [data, error] = (await handle(async () => {
      return MataKuliahServices.get({ many: true });
    })) as [MataKuliah[] | null, Error | null];
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
    // Get mata kuliah by id
    const [data, error] = (await handle(() => {
      return MataKuliahServices.get({ id: parseInt(req.params.id) });
    })) as [MataKuliah | null, Error | null];
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
    // Create mata kuliah
    const [data, error] = (await handle(() => {
      return MataKuliahServices.create(req.body);
    })) as [MataKuliah | null, Error | null];
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
    // Update mata kuliah
    const [data, error] = (await handle(() => {
      return MataKuliahServices.update(parseInt(req.params.id), req.body);
    })) as [MataKuliah | null, Error | null];
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
    // Delete mata kuliah
    const [data, error] = (await handle(() => {
      return MataKuliahServices.delete(parseInt(req.params.id));
    })) as [MataKuliah | null, Error | null];
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
