import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient({
  rejectOnNotFound: true,
  log: ["query", "info"],
});
export default prisma;
