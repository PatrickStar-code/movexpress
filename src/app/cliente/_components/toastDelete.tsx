import React from "react";

// Ícones (você pode usar bibliotecas como react-icons ou adicionar seus próprios ícones)
import { FaCheck, FaTimes } from "react-icons/fa";

export default function ConfirmationToast({
  onConfirm,
  onCancel,
  message,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}) {
  return (
    <div className="flex flex-col gap-4 p-4  rounded-lg shadow-lg max-w-sm">
      {/* Mensagem de confirmação */}
      <p className="text-sm text-gray-700 dark:text-gray-200">{message}</p>

      {/* Botões de ação */}
      <div className="flex gap-3 justify-end">
        <button
          onClick={onCancel}
          className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
        >
          <FaTimes className="text-sm" />
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-all duration-200"
        >
          <FaCheck className="text-sm" />
          Confirmar
        </button>
      </div>
    </div>
  );
}
