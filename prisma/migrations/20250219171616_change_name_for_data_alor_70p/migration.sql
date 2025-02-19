/*
  Warnings:

  - You are about to drop the column `valor_70p` on the `Entrega` table. All the data in the column will be lost.
  - Added the required column `valor_descontado` to the `Entrega` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Entrega" DROP COLUMN "valor_70p",
ADD COLUMN     "valor_descontado" DOUBLE PRECISION NOT NULL;
