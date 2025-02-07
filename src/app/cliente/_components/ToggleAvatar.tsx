import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

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

export default function ToggleAvatar({ session }: { session: PropsUser }) {
  return (
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
          <Link href="/cliente/entregas">
            <DropdownMenuItem>
              <ClipboardList /> <span>Entregas</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Truck />
            <span>Solicitar Entrega</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User />
            <span>Perfil</span>
          </DropdownMenuItem>
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
  );
}
