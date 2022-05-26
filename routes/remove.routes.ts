import express from "express";
import MataKuliahServices from "../services/mataKuliah.services";
import { handle } from "../lib/error";
const routes = express
  .Router()
  .put("/:id/remove/mahasiswa", async (req, res) => {
    const [data, error] = await handle(() =>
      MataKuliahServices.removeMahasiswa({
        id: parseInt(req.params.id),
        mahasiswaId: req.body.id,
      })
    );
    if (error) {
      return res.status(500).json({
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    }
    return res.json(data);
  })
  .put("/:id/remove/dosen", async (req, res) => {
    const [data, error] = await handle(() =>
      MataKuliahServices.removeDosen({
        id: parseInt(req.params.id),
        dosenId: req.body.id,
      })
    );
    if (error) {
      return res.status(500).json({
        error: {
          message: error.message,
          stack: error.stack,
        },
      });
    }
    return res.json(data);
  });
export default routes;
