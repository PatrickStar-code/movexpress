import React from "react";
import Navbar from "./_components/navbar";
import { ScrollProgress } from "../_components/ui/scroll-progress";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <ScrollProgress className="fixed top-[px]" />
      {children}
    </>
  );
}
