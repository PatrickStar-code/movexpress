import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Truck } from "lucide-react";
import React from "react";
import FormRegisterDeliveryMan from "./formRegister";

export default function DialogRegisterDeliveryMan({
  Trigger,
}: {
  Trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{Trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <div className="flex flex-col items-center gap-4">
            <Truck className="w-16 h-16" />
            <DialogTitle>Registro de Entregadores</DialogTitle>
          </div>
          <DialogDescription></DialogDescription>
          <FormRegisterDeliveryMan />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
