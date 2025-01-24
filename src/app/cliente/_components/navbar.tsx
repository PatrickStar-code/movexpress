"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

export default function Navbar() {
  const [theme, setTheme] = useState("light");

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Detectar o tema preferido pelo dispositivo do usuário
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(prefersDark ? "dark" : "light");
    // Aplicar a classe no HTML para o Tailwind CSS controlar o tema
    document.documentElement.classList.add(prefersDark ? "dark" : "light");
  }, []);

  useEffect(() => {
    // Aplica o tema no elemento <html>
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  // Animação para o botão de tema
  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 sticky top-0 bg-white dark:bg-[#0C0A09] shadow-md">
      {/* Logo ou Nome */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          Brand
        </h1>
      </motion.div>

      {/* Menu para telas grandes */}
      <motion.ul
        className="hidden md:flex space-x-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <li>
          <a
            href="#"
            className="text-gray-700 dark:text-gray-300 hover:underline"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-700 dark:text-gray-300 hover:underline"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-gray-700 dark:text-gray-300 hover:underline"
          >
            Contact
          </a>
        </li>
      </motion.ul>

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
        <Button className="px-4 py-2  text-white rounded-lg focus:outline-none">
          Registrar
        </Button>
        <Button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none">
          Logar
        </Button>
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

        {/* Menu dropdown */}
        {isMobileMenuOpen && (
          <motion.ul
            className="absolute top-16 left-0 w-full bg-gray-100 dark:bg-[#0C0A09]  shadow-md flex flex-col space-y-4 p-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <li>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:underline"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:underline"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-700 dark:text-gray-300 hover:underline"
              >
                Contact
              </a>
            </li>
            <li>
              <Button className="w-full px-4 py-2  text-white rounded-lg focus:outline-none">
                Registrar
              </Button>
            </li>
            <li>
              <Button className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none">
                Logar
              </Button>
            </li>
          </motion.ul>
        )}
      </div>
    </nav>
  );
}
