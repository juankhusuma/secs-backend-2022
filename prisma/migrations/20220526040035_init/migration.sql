/*
  Warnings:

  - You are about to alter the column `NIP` on the `Dosen` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `NIM` on the `Mahasiswa` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[NIP]` on the table `Dosen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `Dosen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[NIM]` on the table `Mahasiswa` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `MataKuliah` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `MataKuliah` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Dosen" ALTER COLUMN "NIP" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Mahasiswa" ALTER COLUMN "NIM" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "MataKuliah" ALTER COLUMN "code" SET DATA TYPE VARCHAR(255);

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_NIP_key" ON "Dosen"("NIP");

-- CreateIndex
CREATE UNIQUE INDEX "Dosen_username_key" ON "Dosen"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Mahasiswa_NIM_key" ON "Mahasiswa"("NIM");

-- CreateIndex
CREATE UNIQUE INDEX "MataKuliah_name_key" ON "MataKuliah"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MataKuliah_code_key" ON "MataKuliah"("code");
