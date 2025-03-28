import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

import React from "react";
import {
  ClipboardList,
  CreditCard,
  LogOut,
  Settings,
  Truck,
  User,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { PropsUser } from "./navbar";
import logoutUser from "../_actions/logout";
import Link from "next/link";
import { DeliveryForm } from "./formNewDelivery";

export default function ToggleAvatar({ session }: { session: PropsUser }) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuLabel className=" text-sm font-extralight">
            {session?.user.email}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href="/cliente/perfil">
              <DropdownMenuItem>
                <User /> <span>Perfil</span>
              </DropdownMenuItem>
            </Link>
            <Link href="/cliente/entregas">
              <DropdownMenuItem>
                <ClipboardList /> <span>Entregas</span>
              </DropdownMenuItem>
            </Link>
            <DialogTrigger asChild>
              <DropdownMenuItem>
                <Truck />
                <span>Solicitar Entrega</span>
              </DropdownMenuItem>
            </DialogTrigger>

            <DropdownMenuItem>
              <CreditCard />
              <span>Formas De Pagamento</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              <span>Configurações</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={() => logoutUser()}>
            <LogOut />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
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
