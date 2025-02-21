"use client";

import { Badge } from "@/app/_components/ui/badge";
import UseConvertMinutesToHours from "@/app/_hooks/useConvertMinutesToHours";
import { Entrega } from "../entregas/data-table";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/_components/ui/dialog";

export function EntregaDetails({ entrega }: { entrega: Entrega }) {
  return (
    <DialogContent className="sm:max-w-[600px] dark:bg-gray-800">
      {/* Cabeçalho do Dialog */}
      <DialogHeader>
        <DialogTitle className="dark:text-white">
          Detalhes da Entrega
        </DialogTitle>
        <DialogDescription className="dark:text-gray-300">
          Informações completas sobre a entrega selecionada.
        </DialogDescription>
      </DialogHeader>

      {/* Conteúdo do Dialog */}
      <div className="space-y-6 dark:text-white">
        {/* Informações Gerais */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informações Gerais</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>ID:</strong> {entrega.id}
            </div>
            <div>
              <strong>Descrição:</strong> {entrega.descricao}
            </div>
            <div>
              <strong>Peso:</strong> {entrega.peso} kg
            </div>
            <div>
              <strong>Data do Pedido:</strong>{" "}
              {new Date(entrega.data_pedido || "").toLocaleDateString()}
            </div>
            <div>
              <strong>Valor Total:</strong>{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(entrega.valor_total || 0)}
            </div>
            <div>
              <strong>Valor do Transporte:</strong>{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(entrega.valor_transporte || 0)}
            </div>
          </div>
        </div>

        {/* Origem */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Origem</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>CEP:</strong> {entrega.cep_origem}
            </div>
            <div>
              <strong>Número:</strong> {entrega.numero_origem}
            </div>
            <div>
              <strong>Bairro:</strong> {entrega.bairro_origem || "N/A"}
            </div>
            <div>
              <strong>Logradouro:</strong> {entrega.logradouro_origem || "N/A"}
            </div>
          </div>
        </div>

        {/* Destino */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Destino</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>CEP:</strong> {entrega.cep_destino}
            </div>
            <div>
              <strong>Número:</strong> {entrega.numero_destino}
            </div>
            <div>
              <strong>Bairro:</strong> {entrega.bairro_destino || "N/A"}
            </div>
            <div>
              <strong>Logradouro:</strong> {entrega.logradouro_destino || "N/A"}
            </div>
          </div>
        </div>

        {/* Status e Tempo */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Status e Tempo</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Status:</strong>{" "}
              <Badge
                variant="outline"
                color={
                  entrega.status_entrega === "PENDENTE"
                    ? "yellow"
                    : entrega.status_entrega === "EM ROTA"
                    ? "blue"
                    : "green"
                }
                className="capitalize"
              >
                {entrega.status_entrega}
              </Badge>
            </div>
            <div>
              <strong>Distância:</strong> {entrega.distancia_km} km
            </div>
            <div>
              <strong>Tempo de Transporte:</strong>{" "}
              {UseConvertMinutesToHours(entrega.tempo_minutos || 0)}
            </div>
            <div>
              <strong>Hora Prevista:</strong>{" "}
              {entrega.hora_prevista
                ? new Date(entrega.hora_prevista).toLocaleTimeString()
                : "N/A"}
            </div>
          </div>
        </div>

        {/* Assinatura */}
        {entrega.assinado_por && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Assinatura</h3>
            <div>
              <strong>Assinado por:</strong> {entrega.assinado_por}
            </div>
          </div>
        )}
      </div>
    </DialogContent>
  );
}
