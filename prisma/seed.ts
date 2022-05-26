/**
 * Script seeder untuk membuat data dummy pada database guna testing API
 */

import { faker } from "@faker-js/faker";
import { Hari } from "@prisma/client";
import prisma from "../lib/prisma";

// Locale to IND
faker.setLocale("id_ID");

// Populate
(async () => {
  for (let i = 0; i < 20; i++) {
    await prisma.dosen.create({
      data: {
        NIP: faker.unique(() => faker.random.numeric(10)),
        name: faker.unique(faker.name.findName),
        username: faker.unique(() =>
          faker.internet.userName().toLocaleLowerCase()
        ),
        password: faker.unique(faker.internet.password),
        Role: Math.random() > 0.5 ? "ADMIN" : "DOSEN",
        Dosen_MataKuliah: {
          create: {
            MataKuliah: {
              create: {
                name: faker.unique(faker.name.jobArea),
                jadwal: {
                  set: [Hari.MINGGU],
                },
                code: faker.unique(() =>
                  faker.random.alphaNumeric(5, { casing: "upper" })
                ),
                Mahasiswa_MataKuliah: {
                  create: {
                    Mahasiswa: {
                      create: {
                        NIM: faker.unique(() => faker.random.numeric(10)),
                        name: faker.unique(faker.name.findName),
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
})();
