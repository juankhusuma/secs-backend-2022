import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";

export default class MahasiswaValidator {
  public static async checkBody(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, NIM } = req.body;
      if (!name || name === "") throw new Error("Name is required");
      if (name.length < 3)
        throw new Error("Name is too short (3+ characters is required)");
      if (!NIM || NIM === "") throw new Error("NIP is required");
      let mahasiswa = await prisma.mahasiswa.findUnique({ where: { NIM } });
      if (mahasiswa) throw new Error("NIM already in use");
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
      const total = await prisma.mahasiswa.count();
      if (Number.isNaN(parseInt(id)))
        throw new Error(
          "Invalid ID in the route parameter, (ID must be a number)"
        );
      if (parseInt(id) > total)
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

  public static async checkUpdatePayload(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, NIM } = req.body;
      if (name) {
        console.log(name.length);
        if (name.length < 3)
          throw new Error("Name is too short (3+ characters is required)");
      } else if (name === "")
        throw new Error("Name could not be set to an empty string");
      if (NIM) {
        let mahasiswa = await prisma.mahasiswa.findUnique({ where: { NIM } });
        if (mahasiswa) throw new Error("NIP already in use");
      } else if (NIM === "") {
        throw new Error("NIP could not be set to an empty string");
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
}
