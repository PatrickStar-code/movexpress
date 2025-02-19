/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Garante que a API não seja armazenada em cache

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const origem = searchParams.get("origem");
    const destino = searchParams.get("destino");
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!origem || !destino) {
        return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origem}&destinations=${destino}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: "Erro ao buscar distância" }, { status: 500 });
    }
}
