import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import React from "react";
import { DeliveryForm } from "./formNewDelivery";

export default function DialogNewDelivery({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
            Solicitar Entrega
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Preencha os campos abaixo para solicitar uma nova entrega.
          </DialogDescription>
        </DialogHeader>
        <DeliveryForm />
      </DialogContent>
    </Dialog>
  );
}
