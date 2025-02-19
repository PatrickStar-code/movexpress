"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollProgress } from "@/app/_components/ui/scroll-progress";
import DialogLogin from "./DialogLogin";
import ToggleAvatar from "./ToggleAvatar";
import Image from "next/image";

export type PropsUser = {
  expires: string;
  user: {
    id: string;
    email: string;
    tipo_usuario: string;
  };
} | null;

export default function Navbar({ session }: { session: PropsUser }) {
  const [theme, setTheme] = useState("light");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
    document.documentElement.classList.add(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <>
      {pathName !== "/cliente/cadastro" && (
        <>
          <nav className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white dark:bg-[#0C0A09] z-50 shadow-md">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Link
                href="/cliente"
                className="cursor-pointer text-xl font-bold text-gray-800 flex gap-4 justify-center items-center dark:text-gray-200"
              >
                <Image
                  src="/img/logo_black.png"
                  alt="MoveXpress"
                  className="dark:hidden block"
                  width={52}
                  height={52}
                />
                <Image
                  src="/img/logo_white.png"
                  alt="MoveXpress"
                  className="dark:block hidden"
                  width={52}
                  height={52}
                />
              </Link>
            </motion.div>

            {/* Botões de Registrar e Logar */}
            <div className="hidden md:flex space-x-4">
              <motion.button
                className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-[#0C0A09] rounded-full focus:outline-none"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? (
                  <Moon className="text-blue-500 w-6 h-6" />
                ) : (
                  <Sun className="text-yellow-500 w-6 h-6" />
                )}
              </motion.button>
              {session && session.user.tipo_usuario === "CLIENTE" ? (
                <ToggleAvatar session={session} />
              ) : (
                <>
                  <Button
                    asChild
                    variant={"secondary"}
                    className="px-4 py-2 rounded-lg focus:outline-none"
                  >
                    <Link href="cliente/cadastro" replace>
                      Registrar
                    </Link>
                  </Button>
                  <DialogLogin>
                    <Button className="px-4 py-2  focus:outline-none">
                      Logar
                    </Button>
                  </DialogLogin>
                </>
              )}
            </div>

            {/* Menu para telas pequenas */}
            <div className="md:hidden flex gap-4">
              <motion.button
                className="flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? (
                  <Moon className="text-blue-500 w-6 h-6" />
                ) : (
                  <Sun className="text-yellow-500 w-6 h-6" />
                )}
              </motion.button>
              {session && session.user.tipo_usuario === "CLIENTE" ? (
                <ToggleAvatar session={session} />
              ) : (
                <button
                  className="text-gray-700 dark:text-gray-300 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {/* Ícone de menu animado */}
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    initial="closed"
                    animate={isMobileMenuOpen ? "open" : "closed"}
                    variants={{
                      closed: { rotate: 0, scale: 1 },
                      open: { rotate: 90, scale: 1.2 },
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMobileMenuOpen ? (
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                      />
                    ) : (
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 12h16.5M3.75 6h16.5M3.75 18h16.5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                      />
                    )}
                  </motion.svg>
                </button>
              )}

              {/* Menu dropdown */}
              {isMobileMenuOpen && session?.user.tipo_usuario !== "CLIENTE" && (
                <motion.ul
                  className="absolute top-16 left-0 w-full bg-gray-100 dark:bg-[#0C0A09]  shadow-md flex flex-col space-y-4 p-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <li>
                    <DialogLogin>
                      <Button className="w-full px-4 py-2  rounded-lg focus:outline-none">
                        Logar{" "}
                      </Button>
                    </DialogLogin>
                  </li>
                  <li>
                    <Button
                      variant={"secondary"}
                      className="w-full px-4 py-2  rounded-lg focus:outline-none"
                    >
                      <Link href="cliente/cadastro" replace>
                        {" "}
                        Registrar{" "}
                      </Link>
                    </Button>
                  </li>
                </motion.ul>
              )}
            </div>
          </nav>
          <ScrollProgress className="fixed top-[px]" />
        </>
      )}
    </>
  );
}
