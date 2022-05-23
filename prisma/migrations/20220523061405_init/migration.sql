-- CreateTable
CREATE TABLE "Mahasiswa" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Mahasiswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Dosen" (
    "id" SERIAL NOT NULL,
    "NIP" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Dosen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MataKuliah" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MataKuliah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mahasiswa_MataKuliah" (
    "mahasiswaId" INTEGER NOT NULL,
    "mataKuliahId" INTEGER NOT NULL,

    CONSTRAINT "Mahasiswa_MataKuliah_pkey" PRIMARY KEY ("mahasiswaId","mataKuliahId")
);

-- CreateTable
CREATE TABLE "Dosen_MataKuliah" (
    "dosenId" INTEGER NOT NULL,
    "mataKuliahId" INTEGER NOT NULL,

    CONSTRAINT "Dosen_MataKuliah_pkey" PRIMARY KEY ("dosenId","mataKuliahId")
);

-- AddForeignKey
ALTER TABLE "Mahasiswa_MataKuliah" ADD CONSTRAINT "Mahasiswa_MataKuliah_mahasiswaId_fkey" FOREIGN KEY ("mahasiswaId") REFERENCES "Mahasiswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mahasiswa_MataKuliah" ADD CONSTRAINT "Mahasiswa_MataKuliah_mataKuliahId_fkey" FOREIGN KEY ("mataKuliahId") REFERENCES "MataKuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dosen_MataKuliah" ADD CONSTRAINT "Dosen_MataKuliah_dosenId_fkey" FOREIGN KEY ("dosenId") REFERENCES "Dosen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dosen_MataKuliah" ADD CONSTRAINT "Dosen_MataKuliah_mataKuliahId_fkey" FOREIGN KEY ("mataKuliahId") REFERENCES "MataKuliah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
