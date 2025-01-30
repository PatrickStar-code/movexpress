-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('ADMINISTRADOR', 'ENTREGADOR', 'CLIENTE');

-- CreateEnum
CREATE TYPE "StatusCnh" AS ENUM ('LIBERADO', 'VERIFICANDO', 'RECUSADO', 'PENDENTE');

-- CreateEnum
CREATE TYPE "StatusEntrega" AS ENUM ('PENDENTE', 'ACEITO', 'ENVIADO', 'ENTREGUE');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome_usuario" TEXT NOT NULL,
    "cpf_usuario" TEXT NOT NULL,
    "email_usuario" TEXT NOT NULL,
    "senha_usuario" TEXT NOT NULL,
    "telefone_usuario" TEXT NOT NULL,
    "tipo_usuario" "TipoUsuario" NOT NULL DEFAULT 'CLIENTE',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entregador" (
    "id" SERIAL NOT NULL,
    "placa_veiculo" TEXT,
    "status_cnh" "StatusCnh" NOT NULL,

    CONSTRAINT "Entregador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entrega" (
    "id" SERIAL NOT NULL,
    "desc_entrega" TEXT NOT NULL,
    "cep_origem_entrega" TEXT NOT NULL,
    "cep_destino_entrega" TEXT NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "status_entrega" "StatusEntrega" NOT NULL,
    "data_entrega" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "entregadorId" INTEGER NOT NULL,
    "usuarioId" INTEGER,

    CONSTRAINT "Entrega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrecoKm" (
    "id" SERIAL NOT NULL,
    "km_min" DOUBLE PRECISION NOT NULL,
    "km_max" DOUBLE PRECISION NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PrecoKm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrecoPeso" (
    "id" SERIAL NOT NULL,
    "peso_min" DOUBLE PRECISION NOT NULL,
    "peso_max" DOUBLE PRECISION NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PrecoPeso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrecoTempo" (
    "id" SERIAL NOT NULL,
    "tempo_min" INTEGER NOT NULL,
    "tempo_max" INTEGER NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PrecoTempo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_cpf_usuario_key" ON "Usuario"("cpf_usuario");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_usuario_key" ON "Usuario"("email_usuario");

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_entregadorId_fkey" FOREIGN KEY ("entregadorId") REFERENCES "Entregador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entrega" ADD CONSTRAINT "Entrega_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
