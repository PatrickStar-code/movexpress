"use server";
import db from "@/lib/db";

interface CalculateDeliveryValueParams {
    distancia: number;
    tempo_transporte: number;
    peso: number;
}

/**
 * Calcula o valor do frete com base na distância, tempo de transporte e peso.
 * @param {number} distancia - Distância em quilômetros.
 * @param {number} tempo_transporte - Tempo de transporte em horas.
 * @param {number} peso - Peso em quilogramas.
 * @returns {Promise<number>} - Valor total do frete.
 */
export default async function calculateDeliveryValue({ distancia, tempo_transporte, peso }: CalculateDeliveryValueParams): Promise<number> {


    if (distancia <= 0 || distancia === null || tempo_transporte <= 0 || tempo_transporte === null) {
        throw new Error("Distância, tempo de transporte ou peso inválidos.");
    }


    else { }
    try {
        // Consultas paralelas ao banco de dados

        const [valorDistancia, valorTempo, valorPeso] = await Promise.all([
            db.precoKm.findFirst({
                where: {
                    km: {
                        lte: distancia,
                    },
                },
                orderBy: {
                    km: 'desc',
                },
            }),
            db.precoTempo.findFirst({
                where: {
                    tempo: {
                        lte: tempo_transporte,
                    },
                },
                orderBy: {
                    tempo: 'desc',
                },
            }),
            db.precoPeso.findFirst({
                where: {
                    AND: [
                        { peso_min: { lte: peso } },
                        { peso_max: { gte: peso } }
                    ]
                },
                orderBy: {
                    peso_min: 'desc'
                }
            })
        ]);

        // Cálculo do valor total
        if (!valorDistancia || !valorTempo || !valorPeso) {
            throw new Error("Não foi possível encontrar os preços necessários no banco de dados.");
        }

        const valorTotal = (distancia * valorDistancia?.valor || 0) + (tempo_transporte * valorTempo?.valor || 0) + (peso * valorPeso?.preco || 0);
        return valorTotal;
    } catch (error) {
        console.error("Erro ao calcular o valor do frete:", error);
        throw new Error("Erro interno ao calcular o valor do frete.");
    }
}