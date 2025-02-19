/*
  Warnings:

  - Changed the type of `distancia_km` on the `Entrega` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Entrega" DROP COLUMN "distancia_km",
ADD COLUMN     "distancia_km" INTEGER NOT NULL;
