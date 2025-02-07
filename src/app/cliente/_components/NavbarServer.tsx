import React from "react";
import Navbar from "./navbar";
import { auth } from "@/auth";

export default async function NavbarServer() {
  const session = await auth();

  return <Navbar session={session} />;
}
