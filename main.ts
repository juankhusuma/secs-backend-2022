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
// app.use("/dosen", new DosenValidator().validate);

// Validation Guards
// Dosen Routes Validation
app
  .get("/dosen/:id", (req, res, next) => DosenValidator.checkId(req, res, next))
  .post("/dosen", (req, res, next) => DosenValidator.checkBody(req, res, next))
  .post("/auth/register", (req, res, next) =>
    DosenValidator.checkBody(req, res, next)
  )
  .put("/dosen/:id/", (req, res, next) =>
    DosenValidator.checkId(req, res, next)
  )
  .put("/dosen/:id", (req, res, next) =>
    DosenValidator.checkUpdatePayload(req, res, next)
  )
  .delete("/dosen/:id", (req, res, next) =>
    DosenValidator.checkId(req, res, next)
  );

// Mahasiswa Routes Validations
app
  .get("/mahasiswa/:id", (req, res, next) =>
    MahasiswaValidator.checkId(req, res, next)
  )
  .post("/mahasiswa", (req, res, next) =>
    MahasiswaValidator.checkBody(req, res, next)
  )
  .put("/mahasiswa/:id", (req, res, next) =>
    MahasiswaValidator.checkId(req, res, next)
  )
  .put("/mahasiswa/:id/", (req, res, next) =>
    MahasiswaValidator.checkUpdatePayload(req, res, next)
  )
  .delete("/mahasiswa/:id", (req, res, next) =>
    MahasiswaValidator.checkId(req, res, next)
  );

// Mata Kuliah Routes Validations
app
  .get("/mata-kuliah/:id", (req, res, next) =>
    MataKuliahValidator.checkId(req, res, next)
  )
  .post("/mata-kuliah", (req, res, next) =>
    MataKuliahValidator.checkBody(req, res, next)
  )
  .put("/mata-kuliah/:id", (req, res, next) =>
    MataKuliahValidator.checkId(req, res, next)
  )
  .put("/mata-kuliah/:id", (req, res, next) =>
    MataKuliahValidator.checkUpdatePayload(req, res, next)
  )
  .delete("/mata-kuliah/:id", (req, res, next) =>
    MataKuliahValidator.checkId(req, res, next)
  )
  .put("/mata-kuliah/:id/mahasiswa", (req, res, next) =>
    MataKuliahValidator.checkMahasiswaUpdateId(req, res, next)
  )
  .put("/mata-kuliah/:id/dosen", (req, res, next) =>
    MataKuliahValidator.checkDosenUpdateId(req, res, next)
  );

// Routes
app
  .use("/dosen", dosenRoutes)
  .use("/mahasiswa", mahasiswaRoutes)
  .use("/mata-kuliah", mataKuliahRoutes)
  .use("/mata-kuliah", assignmentRoutes)
  .use("/mata-kuliah", removeRoutes)
  .use("/auth", authRoutes);

app.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  Guard.admin,
  (req, res) => {
    res.json({
      user: req.user,
    });
  }
);

app.listen(port, () => console.log(retro(`Server listening on port:${port}`)));
