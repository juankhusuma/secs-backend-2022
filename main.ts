import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bp from "body-parser";
import dosenRoutes from "./routes/dosen.routes";
import mahasiswaRoutes from "./routes/mahasiswa.routes";
import mataKuliahRoutes from "./routes/mataKuliah.routes";
import assignmentRoutes from "./routes/assignment.routes";
import removeRoutes from "./routes/remove.routes";
import authRoutes from "./routes/auth.routes";
import { config } from "dotenv";
import { cristal, retro } from "gradient-string";
import DosenValidator from "./validators/dosen.validators";
import MahasiswaValidator from "./validators/mahasiswa.validators";
import MataKuliahValidator from "./validators/mataKuliah.validators";
import "./lib/auth";
import passport from "passport";
import Guard from "./lib/guards";

config();

export const app = express();
const port = process.env.PORT || 5500;

// Middlewares
process.env.MODE === "dev" && app.use(morgan("dev"));

app.use(helmet());
app.use(bp.json());

var reqCount = 0;
process.env.MODE === "dev" &&
  app.use((req, _, next) => {
    console.log(
      cristal(`
    Request[${reqCount}] >> ${req.method} ${req.url}
    `)
    );
    req.body && console.table(req.body);
    reqCount++;
    next();
  });
app.use(passport.authenticate("jwt", { session: false }));

// Validation Guards
// Dosen Routes Validation
app
  .get("/dosen/:id", Guard.both, DosenValidator.checkId)
  .post("/dosen", Guard.both, DosenValidator.checkBody)
  .post("/auth/register", DosenValidator.checkBody)
  .put(
    "/dosen/:id/",
    Guard.admin,
    DosenValidator.checkId,
    DosenValidator.checkUpdatePayload
  )
  .delete("/dosen/:id", Guard.admin, DosenValidator.checkId);

// Mahasiswa Routes Validations
app
  .get("/mahasiswa", Guard.both)
  .get("/mahasiswa/:id", Guard.both, MahasiswaValidator.checkId)
  .post("/mahasiswa", Guard.both, MahasiswaValidator.checkBody)
  .put(
    "/mahasiswa/:id",
    Guard.both,
    MahasiswaValidator.checkId,
    MahasiswaValidator.checkUpdatePayload
  )
  .delete("/mahasiswa/:id", Guard.both, MahasiswaValidator.checkId);

// Mata Kuliah Routes Validations
app
  .get("/mata-kuliah", Guard.both)
  .get("/mata-kuliah/:id", Guard.both, MataKuliahValidator.checkId)
  .post("/mata-kuliah", Guard.admin, MataKuliahValidator.checkBody)
  .put(
    "/mata-kuliah/:id",
    Guard.admin,
    MataKuliahValidator.checkId,
    MataKuliahValidator.checkUpdatePayload
  )
  .delete("/mata-kuliah/:id", Guard.admin, MataKuliahValidator.checkId)
  .put(
    "/mata-kuliah/:id/mahasiswa",
    Guard.admin,
    MataKuliahValidator.checkMahasiswaUpdateId
  )
  .put(
    "/mata-kuliah/:id/dosen",
    Guard.admin,
    MataKuliahValidator.checkDosenUpdateId
  );

// Routes
app
  .use("/dosen", dosenRoutes)
  .use("/mahasiswa", mahasiswaRoutes)
  .use("/mata-kuliah", mataKuliahRoutes)
  .use("/mata-kuliah", assignmentRoutes)
  .use("/mata-kuliah", removeRoutes)
  .use("/auth", authRoutes);

app.get("/", Guard.dosen, (req, res) => {
  res.json({
    user: req.user,
  });
});

app.listen(port, () => console.log(retro(`Server listening on port:${port}`)));
