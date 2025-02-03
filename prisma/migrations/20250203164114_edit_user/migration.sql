/*
  Warnings:

  - Added the required column `login` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Usuario_cpf_key";

-- DropIndex
DROP INDEX "Usuario_email_key";

-- DropIndex
DROP INDEX "Usuario_telefone_key";

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "login" TEXT NOT NULL;
