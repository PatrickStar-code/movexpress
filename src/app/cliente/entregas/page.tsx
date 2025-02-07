"use client";

import * as React from "react";
import { DataTableDemo } from "./data-table";

export default function DeliveryPage() {
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
        <DataTableDemo />
      </div>
    </main>
  );
}
