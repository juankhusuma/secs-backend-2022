import { Dosen, Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import prisma from "./prisma";

interface IStringValidationConfig {
  min?: number;
  max?: number;
  isEmail?: boolean;
}

class Validator {
  public errors: string[] = [];
  protected string(value: string, config: IStringValidationConfig) {
    config.max && value.length > config.max;
    config.min && value.length < config.min;
  }
}

export class DosenValidator extends Validator {
  private async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = req.body as Prisma.DosenCreateInput;
    this.string(data.NIP, { min: 10, max: 10 });
    this.string(data.name, { min: 3, max: 255 });
  }

  public async validate(req: Request, res: Response, next: NextFunction) {
    req.method === "POST" && this.create(req, res, next);
  }
}
export class MahasiswaValidator extends Validator {}
export class MataKuliahValidator extends Validator {}
