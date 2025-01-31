/*
  Warnings:

  - The values [ADMINISTRADOR] on the enum `TipoUsuario` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `cep_destino_entrega` on the `Entrega` table. All the data in the column will be lost.
  - You are about to drop the column `cep_origem_entrega` on the `Entrega` table. All the data in the column will be lost.
  - You are about to drop the column `data_entrega` on the `Entrega` table. All the data in the column will be lost.
  - You are about to drop the column `desc_entrega` on the `Entrega` table. All the data in the column will be lost.
  - You are about to drop the column `placa_veiculo` on the `Entregador` table. All the data in the column will be lost.
  - The `status_cnh` column on the `Entregador` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `km_max` on the `PrecoKm` table. All the data in the column will be lost.
  - You are about to drop the column `km_min` on the `PrecoKm` table. All the data in the column will be lost.
  - You are about to drop the column `valor` on the `PrecoPeso` table. All the data in the column will be lost.
  - You are about to drop the column `tempo_max` on the `PrecoTempo` table. All the data in the column will be lost.
  - You are about to drop the column `tempo_min` on the `PrecoTempo` table. All the data in the column will be lost.
  - You are about to drop the column `cpf_usuario` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email_usuario` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `nome_usuario` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `senha_usuario` on the `Usuario` table. All the data in the column will be lost.
  - You are about to drop the column `telefone_usuario` on the `Usuario` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usuarioId]` on the table `Entregador` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[telefone]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bairro_destino` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep_destino` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep_origem` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `distancia_km` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logradouro_destino` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_destino` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `numero_origem` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `peso` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempo_minutos` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempo_transporte` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_70p` to the `Entrega` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agencia` to the `Entregador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnh` to the `Entregador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cnh_foto` to the `Entregador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `conta_corrente` to the `Entregador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `placa_moto` to the `Entregador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Entregador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `km` to the `PrecoKm` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preco` to the `PrecoPeso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempo` to the `PrecoTempo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusCNH" AS ENUM ('LIBERADO', 'VERIFICANDO', 'RECUSADO', 'PENDENTE');

-- AlterEnum
BEGIN;
CREATE TYPE "TipoUsuario_new" AS ENUM ('ADMIN', 'CLIENTE', 'ENTREGADOR');
ALTER TABLE "Usuario" ALTER COLUMN "tipo_usuario" DROP DEFAULT;
ALTER TABLE "Usuario" ALTER COLUMN "tipo_usuario" TYPE "TipoUsuario_new" USING ("tipo_usuario"::text::"TipoUsuario_new");
ALTER TYPE "TipoUsuario" RENAME TO "TipoUsuario_old";
ALTER TYPE "TipoUsuario_new" RENAME TO "TipoUsuario";
DROP TYPE "TipoUsuario_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Entrega" DROP CONSTRAINT "Entrega_entregadorId_fkey";

-- DropIndex
DROP INDEX "Usuario_cpf_usuario_key";

-- DropIndex
DROP INDEX "Usuario_email_usuario_key";

-- AlterTable
ALTER TABLE "Entrega" DROP COLUMN "cep_destino_entrega",
DROP COLUMN "cep_origem_entrega",
DROP COLUMN "data_entrega",
DROP COLUMN "desc_entrega",
ADD COLUMN     "assinado_por" TEXT,
ADD COLUMN     "bairro_destino" TEXT NOT NULL,
ADD COLUMN     "bairro_origem" TEXT,
ADD COLUMN     "cep_destino" TEXT NOT NULL,
ADD COLUMN     "cep_origem" TEXT NOT NULL,
ADD COLUMN     "complemento" TEXT,
ADD COLUMN     "data_pedido" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "descricao" TEXT NOT NULL,
ADD COLUMN     "distancia_km" TEXT NOT NULL,
ADD COLUMN     "hora_inicio" TIMESTAMP(3),
ADD COLUMN     "hora_prevista" TIMESTAMP(3),
ADD COLUMN     "logradouro_destino" TEXT NOT NULL,
ADD COLUMN     "logradouro_origem" TEXT,
ADD COLUMN     "numero_destino" INTEGER NOT NULL,
ADD COLUMN     "numero_origem" INTEGER NOT NULL,
ADD COLUMN     "peso" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tempo_minutos" INTEGER NOT NULL,
ADD COLUMN     "tempo_transporte" TEXT NOT NULL,
ADD COLUMN     "valor_70p" DOUBLE PRECISION NOT NULL,
ALTER COLUMN "status_entrega" SET DEFAULT 'PENDENTE',
ALTER COLUMN "entregadorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Entregador" DROP COLUMN "placa_veiculo",
ADD COLUMN     "agencia" TEXT NOT NULL,
ADD COLUMN     "cnh" TEXT NOT NULL,
ADD COLUMN     "cnh_foto" TEXT NOT NULL,
ADD COLUMN     "conta_corrente" TEXT NOT NULL,
ADD COLUMN     "placa_moto" TEXT NOT NULL,
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
DROP COLUMN "status_cnh",
ADD COLUMN     "status_cnh" "StatusCNH" NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE "PrecoKm" DROP COLUMN "km_max",
DROP COLUMN "km_min",
ADD COLUMN     "km" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "PrecoPeso" DROP COLUMN "valor",
ADD COLUMN     "preco" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "PrecoTempo" DROP COLUMN "tempo_max",
DROP COLUMN "tempo_min",
ADD COLUMN     "tempo" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Usuario" DROP COLUMN "cpf_usuario",
DROP COLUMN "email_usuario",
DROP COLUMN "nome_usuario",
DROP COLUMN "senha_usuario",
DROP COLUMN "telefone_usuario",
ADD COLUMN     "cep" TEXT,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "foto" TEXT,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL,
ADD COLUMN     "telefone" TEXT NOT NULL,
ALTER COLUMN "tipo_usuario" DROP DEFAULT;

-- DropEnum
DROP TYPE "StatusCnh";

-- CreateIndex
CREATE UNIQUE INDEX "Entregador_usuarioId_key" ON "Entregador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_telefone_key" ON "Usuario"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_key" ON "Usuario"("cpf");

-- AddForeignKey
ALTER TABLE "Entregador" ADD CONSTRAINT "Entregador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_entregadorId_fkey" FOREIGN KEY ("entregadorId") REFERENCES "Entregador"("id") ON DELETE SET NULL ON UPDATE CASCADE;
