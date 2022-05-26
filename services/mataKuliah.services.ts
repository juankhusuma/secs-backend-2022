import prisma from "../lib/prisma";
import { Prisma } from "@prisma/client";

interface IGetConfig extends Prisma.MataKuliahWhereUniqueInput {
  many?: boolean;
}

interface IAssignMataKuliahToMahasiswa {
  id: number;
  mahasiswaId: number;
}

interface IAssignMataKuliahToDosen {
  id: number;
  dosenId: number;
}

export default class MataKuliahServices {
  //Create
  public static async create(data: Prisma.MataKuliahCreateInput) {
    return await prisma.mataKuliah.create({
      data,
    });
  }

  // Read
  public static async get(conf: IGetConfig) {
    if (conf.many) {
      const data = await prisma.mataKuliah.findMany({
        include: {
          Dosen_MataKuliah: {
            select: {
              Dosen: true,
            },
          },
          Mahasiswa_MataKuliah: {
            select: {
              Mahasiswa: true,
            },
          },
        },
      });
      return data.map(
        ({ Dosen_MataKuliah, Mahasiswa_MataKuliah, ...MatKul }) => ({
          ...MatKul,
          Dosen: Dosen_MataKuliah.map((dosen) => {
            const { password, ...Dosen } = dosen.Dosen;
            return Dosen;
          }),
          Mahasiswa: Mahasiswa_MataKuliah.map(
            (mahasiswa) => mahasiswa.Mahasiswa
          ),
        })
      );
    }
    const data = await prisma.mataKuliah.findUnique({
      where: { id: conf.id },
      include: {
        Dosen_MataKuliah: {
          select: {
            Dosen: true,
          },
        },
        Mahasiswa_MataKuliah: {
          select: {
            Mahasiswa: true,
          },
        },
      },
    });
    if (data) {
      const { Dosen_MataKuliah, Mahasiswa_MataKuliah, ...MatKul } = data;
      return {
        ...MatKul,
        Dosen: Dosen_MataKuliah.map((dosen) => {
          const { password, ...Dosen } = dosen.Dosen;
          return Dosen;
        }),
        Mahasiswa: Mahasiswa_MataKuliah.map((mahasiswa) => mahasiswa.Mahasiswa),
      };
    }
    return data;
  }

  // Update
  public static async update(id: number, data: Prisma.MataKuliahUpdateInput) {
    return await prisma.mataKuliah.update({
      where: { id },
      data,
    });
  }

  // Delete
  public static async delete(id: number) {
    return await prisma.mataKuliah.delete({
      where: { id },
    });
  }

  public static async assignMahasiswa(args: IAssignMataKuliahToMahasiswa) {
    return await prisma.mataKuliah.update({
      where: { id: args.id },
      data: {
        Mahasiswa_MataKuliah: {
          create: {
            Mahasiswa: {
              connect: {
                id: args.mahasiswaId,
              },
            },
          },
        },
      },
    });
  }

  public static async assignDosen(args: IAssignMataKuliahToDosen) {
    return await prisma.mataKuliah.update({
      where: { id: args.id },
      data: {
        Dosen_MataKuliah: {
          create: {
            Dosen: {
              connect: {
                id: args.dosenId,
              },
            },
          },
        },
      },
    });
  }

  public static async removeMahasiswa(args: IAssignMataKuliahToMahasiswa) {
    return await prisma.mataKuliah.update({
      where: { id: args.id },
      data: {
        Mahasiswa_MataKuliah: {
          delete: {
            mahasiswaId_mataKuliahId: {
              mahasiswaId: args.mahasiswaId,
              mataKuliahId: args.id,
            },
          },
        },
      },
    });
  }

  public static async removeDosen(args: IAssignMataKuliahToDosen) {
    return await prisma.mataKuliah.update({
      where: { id: args.id },
      data: {
        Dosen_MataKuliah: {
          delete: {
            dosenId_mataKuliahId: {
              dosenId: args.dosenId,
              mataKuliahId: args.id,
            },
          },
        },
      },
    });
  }
}
