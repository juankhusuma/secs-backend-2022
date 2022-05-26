import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

interface IGetConfig extends Prisma.DosenWhereUniqueInput {
  many?: boolean;
}

export default class DosenServices {
  public static async create(data: Prisma.DosenCreateInput) {
    return await prisma.dosen.create({
      data,
    });
  }

  public static async get(conf: IGetConfig) {
    if (conf.many) {
      const data = await prisma.dosen.findMany({
        include: {
          Dosen_MataKuliah: {
            select: {
              MataKuliah: true,
            },
          },
        },
      });
      return data.map(({ Dosen_MataKuliah, ...Dosen }) => ({
        ...Dosen,
        MataKuliah: Dosen_MataKuliah.map(({ MataKuliah }) => ({
          ...MataKuliah,
        })),
      }));
    }
    const include = {
      include: {
        Dosen_MataKuliah: {
          select: {
            MataKuliah: true,
          },
        },
      },
    };
    const data = conf.id
      ? await prisma.dosen.findUnique({
          where: { id: conf.id },
          ...include,
        })
      : await prisma.dosen.findUnique({
          where: { username: conf.username },
          ...include,
        });
    if (data) {
      const { Dosen_MataKuliah, password, ...Dosen } = data;
      return {
        ...Dosen,
        MataKuliah: Dosen_MataKuliah.map(({ MataKuliah }) => ({
          ...MataKuliah,
        })),
      };
    }
    return data;
  }

  public static async update(id: number, data: Prisma.DosenUpdateInput) {
    return await prisma.dosen.update({
      where: { id },
      data,
    });
  }

  public static async delete(id: number) {
    return await prisma.dosen.delete({
      where: { id },
    });
  }
}
