import express from "express";
import MataKuliahServices from "../services/mataKuliah.services";
import { handle } from "../lib/error";
import send from "../lib/send";
const routes = express
  .Router()
  .put("/:id/remove/mahasiswa", async (req, res) => {
    const [data, error] = await handle(() =>
      MataKuliahServices.removeMahasiswa({
        id: parseInt(req.params.id),
        mahasiswaId: req.body.id,
      })
    );
    return send(res, data, error);
  })
  .put("/:id/remove/dosen", async (req, res) => {
    const [data, error] = await handle(() =>
      MataKuliahServices.removeDosen({
        id: parseInt(req.params.id),
        dosenId: req.body.id,
      })
    );
    return send(res, data, error);
  });
export default routes;
