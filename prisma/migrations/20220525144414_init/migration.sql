/*
  Warnings:

  - The `jadwal` column on the `MataKuliah` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Hari" AS ENUM ('SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU');

-- AlterTable
ALTER TABLE "MataKuliah" DROP COLUMN "jadwal",
ADD COLUMN     "jadwal" "Hari"[];
