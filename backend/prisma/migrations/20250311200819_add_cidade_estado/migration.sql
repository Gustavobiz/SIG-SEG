/*
  Warnings:

  - Added the required column `cidade` to the `Denuncia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `estado` to the `Denuncia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Denuncia" ADD COLUMN     "cidade" TEXT NOT NULL,
ADD COLUMN     "estado" TEXT NOT NULL;
