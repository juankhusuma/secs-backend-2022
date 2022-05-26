import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma";

interface IGetConfig extends Prisma.MahasiswaWhereUniqueInput {
  many?: boolean;
}

export default class MahasiswaServices {
  //Create
  public static async create(data: Prisma.MahasiswaCreateInput) {
    return await prisma.mahasiswa.create({
      data,
    });
  }

  // Read
  public static async get(conf: IGetConfig) {
    if (conf.many) {
      const data = await prisma.mahasiswa.findMany({
        include: {
          Mahasiswa_MataKuliah: {
            select: {
              MataKuliah: {
                select: {
                  id: true,
                  name: true,
                  code: true,
                  jadwal: true,
                },
              },
            },
          },
        },
      });
      return data.map(({ Mahasiswa_MataKuliah, ...Mahasiswa }) => ({
        ...Mahasiswa,
        MataKuliah: Mahasiswa_MataKuliah.map(({ MataKuliah }) => ({
          ...MataKuliah,
        })),
      }));
    }
    const data = await prisma.mahasiswa.findUnique({
      where: { id: conf.id },
      include: {
        Mahasiswa_MataKuliah: {
          select: {
            MataKuliah: {
              select: {
                id: true,
                name: true,
                code: true,
                jadwal: true,
              },
            },
          },
        },
      },
    });
    if (data) {
      const { Mahasiswa_MataKuliah, ...rest } = data;
      return {
        ...rest,
        MataKuliah: Mahasiswa_MataKuliah.map(({ MataKuliah }) => ({
          ...MataKuliah,
        })),
      };
    }
    return data;
  }

  // Update
  public static async update(id: number, data: Prisma.MahasiswaUpdateInput) {
    return await prisma.mahasiswa.update({
      where: { id },
      data,
    });
  }

  // Delete
  public static async delete(id: number) {
    return await prisma.mahasiswa.delete({
      where: { id },
    });
  }
}
