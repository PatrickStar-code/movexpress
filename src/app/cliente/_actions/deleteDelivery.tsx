"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function DeleteDelivery({ id }: { id: number }) {
  try {
    await db.entrega.delete({
      where: {
        id: id,
      },
    });
  } catch (e) {
    console.error(e);
    throw new Error("Erro ao deletar entrega");
  }
  revalidatePath("/cliente/entregas");
}
