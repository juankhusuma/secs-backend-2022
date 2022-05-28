import { NextFunction, Request, Response } from "express";

export default class Guard {
  public static admin(req: Request, res: Response, next: NextFunction) {
    if ((req?.user as any).Role === "ADMIN") {
      return next();
    }
    return res.status(403).json({ message: "Unauthorized" });
  }

  public static dosen(req: Request, res: Response, next: NextFunction) {
    if ((req?.user as any).Role === "DOSEN") {
      return next();
    }
    return res.status(403).json({ message: "Unauthorized" });
  }
}
