import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bp from "body-parser";
import dosenRoutes from "./routes/dosen.routes";
import mahasiswaRoutes from "./routes/mahasiswa.routes";
import mataKuliahRoutes from "./routes/mataKuliah.routes";
import assignmentRoutes from "./routes/assignment.routes";
import removeRoutes from "./routes/remove.routes";
import { config } from "dotenv";
import { cristal } from "gradient-string";

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

// Routes
app.use("/dosen", dosenRoutes);
app.use("/mahasiswa", mahasiswaRoutes);
app.use("/mata-kuliah", mataKuliahRoutes);
app.use("/mata-kuliah", assignmentRoutes);
app.use("/mata-kuliah", removeRoutes);

app.listen(port, () => console.log(`Server listening on port:${port}`));
