/*
  Warnings:

  - A unique constraint covering the columns `[codigo]` on the table `Denuncia` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `codigo` to the `Denuncia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Denuncia` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Denuncia" ADD COLUMN     "codigo" TEXT NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Denuncia_codigo_key" ON "Denuncia"("codigo");
