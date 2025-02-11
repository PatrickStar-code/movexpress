import { Dialog, DialogTrigger } from "@/app/_components/ui/dialog";
import React from "react";

export default function DialogNewDelivery({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
    </Dialog>
  );
}
