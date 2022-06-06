import { hash } from "bcryptjs";
import prisma from "../lib/prisma";

(async () => {
  await prisma.dosen.create({
    data: {
      name: "ADMIN 0",
      NIP: "000",
      username: "admin",
      password: await hash("admin", 12),
      Role: "ADMIN",
    },
  });
  console.log("ADDED ADMIN");
})();
