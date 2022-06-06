import express from "express";
import MataKuliahServices from "../services/mataKuliah.services";
import { handle } from "../lib/error";
import send from "../lib/send";

const routes = express
  .Router()
  .put("/:id/assign/mahasiswa", async (req, res) => {
    const [data, error] = await handle(() =>
      MataKuliahServices.assignMahasiswa({
        id: parseInt(req.params.id),
        mahasiswaId: req.body.id,
      })
    );
    return send(res, data, error);
  })
  .put("/:id/assign/dosen", async (req, res) => {
    const [data, error] = await handle(() =>
      MataKuliahServices.assignDosen({
        id: parseInt(req.params.id),
        dosenId: req.body.id,
      })
    );
    return send(res, data, error);
  });
export default routes;
