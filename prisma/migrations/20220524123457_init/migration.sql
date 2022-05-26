/*
  Warnings:

  - Added the required column `name` to the `Dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NIM` to the `Mahasiswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jadwal` to the `MataKuliah` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DOSEN');

-- AlterTable
ALTER TABLE "Dosen" ADD COLUMN     "Role" "Role" NOT NULL DEFAULT E'DOSEN',
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Mahasiswa" ADD COLUMN     "NIM" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MataKuliah" ADD COLUMN     "jadwal" TIMESTAMP(3) NOT NULL;
