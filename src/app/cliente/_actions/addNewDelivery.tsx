"use server";

import { auth } from "@/auth";
import { TDataFormated } from "../_components/formNewDelivery";
import db from "@/lib/db";

export default async function AddNewDelivery(DeliveryData: TDataFormated) {
  try {
    const Discount = 0.7;
    const session = await auth();
    const idSession = session?.user.id ? parseInt(session.user.id) : undefined; // Converte string para número

    const DiscountedValue = DeliveryData.valor_total * Discount;

    if (!idSession) {
      throw new Error("Usuário não autenticado.");
    }

    const DataFormated = {
      descricao: DeliveryData.descricao,
      peso: DeliveryData.peso,
      cep_origem: DeliveryData.cep_origem,
      numero_origem: DeliveryData.numero_origem,
      bairro_origem: DeliveryData.bairro_origem,
      logradouro_origem: DeliveryData.logradouro_origem,
      cep_destino: DeliveryData.cep_destino,
      numero_destino: DeliveryData.numero_destino,
      bairro_destino: DeliveryData.bairro_destino,
      logradouro_destino: DeliveryData.logradouro_destino,
      valor_total: DeliveryData.valor_total,
      usuarioId: idSession, // Agora é um número
      distancia_km: DeliveryData.distancia_km,
      valor_descontado: Number(DiscountedValue.toFixed(2)),
      tempo_minutos: DeliveryData.tempo_minutos,
    };
    console.log(DataFormated);

    return db.entrega.create({ data: DataFormated });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error);
  }
}
