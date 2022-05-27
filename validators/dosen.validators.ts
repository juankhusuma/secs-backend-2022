import { NextFunction, Request, Response } from "express";
import prisma from "../lib/prisma";

export default class DosenValidator {
  public static async checkBody(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { name, NIP, password, username, Role } = req.body;
      if (!name || name === "") throw new Error("Name is required");
      if (name.length < 3)
        throw new Error("Name is too short (3+ characters is required)");
      if (!NIP || NIP === "") throw new Error("NIP is required");
      let user = await prisma.dosen.findUnique({ where: { NIP } });
      if (user) throw new Error("NIP already in use");
      if (!username || username === "") throw new Error("Username is required");
      if (username.length <= 3)
        throw new Error("Username is too short (3+ characters is required)");
      if (/[A-Z]/.test(username))
        throw new Error("Username must not contain uppercase letters");
      user = await prisma.dosen.findUnique({ where: { username } });
      if (user) throw new Error("Username already in use");
      if (!password || password === "") throw new Error("Password is required");
      if (Role && Role !== "DOSEN" && Role !== "ADMIN")
        throw new Error("Role could only be either DOSEN or ADMIN");
      // Checks if the password is secure enough
      if (password.length < 8)
        throw new Error("Password is too short (8+ characters is required)");
      if (!password.match(/[A-Z]/))
        throw new Error("Password must contain at least 1 uppercase letter");
      if (!password.match(/[a-z]/))
        throw new Error("Password must contain at least 1 lowercase letter");
      if (!password.match(/\d/))
        throw new Error("Password must contain at least 1 number");
      if (!password.match(/[^A-Za-z0-9]/))
        throw new Error("Password must contain at least 1 special character");
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
      const total = await prisma.dosen.count();
      if (Number.isNaN(parseInt(id)))
        throw new Error(
          "Invalid ID in the route parameter, (ID must be a number)"
        );
      if (parseInt(id) > total) throw new Error("This Dosen does not exist");
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
      const { name, NIP, password, username, Role } = req.body;
      if (name) {
        console.log(name.length);
        if (name.length < 3)
          throw new Error("Name is too short (3+ characters is required)");
      } else if (name === "")
        throw new Error("Name could not be set to an empty string");
      if (NIP) {
        let user = await prisma.dosen.findUnique({ where: { NIP } });
        if (user) throw new Error("NIP already in use");
      } else if (NIP === "") {
        throw new Error("NIP could not be set to an empty string");
      }
      if (username) {
        if (username.length < 3)
          throw new Error("Username is too short (3+ characters is required)");
        if (username.match(/[A-Z]/))
          throw new Error("Username must not contain uppercase letters");
        let user = await prisma.dosen.findUnique({ where: { username } });
        if (user) throw new Error("Username already in use");
      } else if (username === "") {
        throw new Error("Username could not be set to an empty string");
      }
      if (password) {
        if (password.length < 8)
          throw new Error("Password is too short (8+ characters is required)");
        if (!password.match(/[A-Z]/))
          throw new Error("Password must contain at least 1 uppercase letter");
        if (!password.match(/[a-z]/))
          throw new Error("Password must contain at least 1 lowercase letter");
        if (!password.match(/\d/))
          throw new Error("Password must contain at least 1 number");
        if (!password.match(/[^A-Za-z0-9]/))
          throw new Error("Password must contain at least 1 special character");
      } else if (password === "") {
        throw new Error("Password could not be set to an empty string");
      }
      if (Role && Role !== "DOSEN" && Role !== "ADMIN")
        throw new Error("Role could only be either DOSEN or ADMIN");

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
