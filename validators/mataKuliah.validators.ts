import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";

export default class MataKuliahValidator {
  public static async checkBody(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, code, jadwal } = req.body;
      if (!name || name === "") throw new Error("Name is required");
      let user = await prisma.mataKuliah.findUnique({ where: { name } });
      if (user) throw new Error("Name already in use");
      if (!code || code === "") throw new Error("Code is required");
      user = await prisma.mataKuliah.findUnique({ where: { code } });
      if (user) throw new Error("Code already in use");
      if (!jadwal || jadwal === []) throw new Error("Jadwal is required");
      const days = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
      for (let i = 0; i < jadwal.length; i++) {
        if (!days.includes(jadwal[i].toUpperCase()))
          throw new Error("Invalid day in jadwal. Must be one of: " + days);
        req.body.jadwal[i] = jadwal[i].toUpperCase();
      }
      return next();
    } catch (error: any) {
      return res.status(500).json({
        status: "Failed",
        code: 500,
        error: { message: error.message },
      });
    }
  }

  public static async checkId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (Number.isNaN(parseInt(id)))
        throw new Error(
          "Invalid ID in the route parameter, (ID must be a number)"
        );
      return next();
    } catch (error: any) {
      return res.status(500).json({
        status: "Failed",
        code: 500,
        error: { message: error.message },
      });
    }
  }

  public static async checkUpdatePayload(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, code, jadwal } = req.body;
      if (name) {
        if (name === "")
          throw new Error("Name could not be set to an empty string");
        let matkul = await prisma.mataKuliah.findUnique({ where: { name } });
        if (matkul) throw new Error("Name already in use");
      }
      if (code) {
        if (code === "")
          throw new Error("Code could not be set to an empty string");
        let matkul = await prisma.mataKuliah.findUnique({ where: { code } });
        if (matkul) throw new Error("Code already in use");
      }
      if (jadwal) {
        if (jadwal === [])
          throw new Error("Jadwal could not be set to an empty array");
        const days = ["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU"];
        for (let i = 0; i < jadwal.length; i++) {
          if (!days.includes(jadwal[i].toUpperCase()))
            throw new Error("Invalid day in jadwal. Must be one of: " + days);
          req.body.jadwal[i] = jadwal[i].toUpperCase();
        }
      }
      return next();
    } catch (error: any) {
      return res.status(500).json({
        status: "Failed",
        code: 500,
        error: { message: error.message },
      });
    }
  }

  public static async checkMahasiswaUpdateId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const total = await prisma.mataKuliah.count();
      if (Number.isNaN(parseInt(id)))
        throw new Error(
          "Invalid ID in the route parameter, (ID must be a number)"
        );
      if (parseInt(id) > total)
        throw new Error("This Mata Kuliah does not exist");
      if (!req.body.id) throw new Error("Mahasiswa ID is required");
      if (Number.isNaN(parseInt(req.body.id)))
        throw new Error(
          "Invalid ID in the request body, (ID must be a number)"
        );
      const totalMahasiswa = await prisma.mahasiswa.count();
      if (parseInt(req.body.id) > totalMahasiswa)
        throw new Error("This Mahasiswa does not exist");
      return next();
    } catch (error: any) {
      return res.status(500).json({
        status: "Failed",
        code: 500,
        error: { message: error.message },
      });
    }
  }

  public static async checkDosenUpdateId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const total = await prisma.mataKuliah.count();
      if (Number.isNaN(parseInt(id)))
        throw new Error(
          "Invalid ID in the route parameter, (ID must be a number)"
        );
      if (parseInt(id) > total)
        throw new Error("This Mata Kuliah does not exist");
      if (!req.body.id) throw new Error("Dosen ID is required");
      if (Number.isNaN(parseInt(req.body.id)))
        throw new Error(
          "Invalid ID in the request body, (ID must be a number)"
        );
      const totalDosen = await prisma.dosen.count();
      if (parseInt(req.body.id) > totalDosen)
        throw new Error("This Dosen does not exist");
      return next();
    } catch (error: any) {
      return res.status(500).json({
        status: "Failed",
        code: 500,
        error: { message: error.message },
      });
    }
  }
}
