import * as React from "react";
import { DataTableDemo } from "./data-table";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import Image from "next/image";

export default async function DeliveryPage() {
  const session = await auth();
  if (session?.user.tipo_usuario !== "CLIENTE" || !session)
    redirect("/cliente");

  const entregas = await db.entrega.findMany({
    where: {
      usuarioId: Number(session.user.id),
    },
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-background p-6">
      <div className="w-full max-w-5xl bg-card p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          📦 Entregas
        </h1>
        <p className="text-muted-foreground mb-6">
          Gerencie suas entregas de forma eficiente. Filtre, ordene e veja os
          detalhes das entregas.
        </p>
        {entregas.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-6">
            <Image
              src="/img/box_empty.png"
              width={128}
              height={128}
              alt="Nenhuma entrega encontrada"
              className="w-24 h-24 mb-4"
            />
            <p className="text-muted-foreground text-lg mb-2">
              🚚 Opa! Parece que o caminhão está vazio...
            </p>
            <p className="text-muted-foreground text-sm">
              Nenhuma entrega encontrada. Que tal fazer uma nova encomenda?
            </p>
          </div>
        ) : (
          <DataTableDemo data={entregas} />
        )}
      </div>
    </main>
  );
}
