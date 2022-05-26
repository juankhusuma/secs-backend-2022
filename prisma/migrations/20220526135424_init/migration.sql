-- DropForeignKey
ALTER TABLE "Dosen_MataKuliah" DROP CONSTRAINT "Dosen_MataKuliah_dosenId_fkey";

-- DropForeignKey
ALTER TABLE "Dosen_MataKuliah" DROP CONSTRAINT "Dosen_MataKuliah_mataKuliahId_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa_MataKuliah" DROP CONSTRAINT "Mahasiswa_MataKuliah_mahasiswaId_fkey";

-- DropForeignKey
ALTER TABLE "Mahasiswa_MataKuliah" DROP CONSTRAINT "Mahasiswa_MataKuliah_mataKuliahId_fkey";

-- AddForeignKey
ALTER TABLE "Mahasiswa_MataKuliah" ADD CONSTRAINT "Mahasiswa_MataKuliah_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa_MataKuliah" ADD CONSTRAINT "Mahasiswa_MataKuliah_mataKuliahId_fkey" FOREIGN KEY ("mataKuliahId") REFERENCES "MataKuliah"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dosen_MataKuliah" ADD CONSTRAINT "Dosen_MataKuliah_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "Dosen"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dosen_MataKuliah" ADD CONSTRAINT "Dosen_MataKuliah_mataKuliahId_fkey" FOREIGN KEY ("mataKuliahId") REFERENCES "MataKuliah"("id") ON DELETE CASCADE ON UPDATE CASCADE;
