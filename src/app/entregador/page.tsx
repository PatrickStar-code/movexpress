"use client";
import { motion } from "framer-motion";

import ThemeToggleButton from "../_components/toggleThemeButton";
import FormLoginDeliveryMan from "./components/formLogin";
import DialogRegisterDeliveryMan from "./components/dialogRegister";

// Esquema de validação com Zod

export default function Login() {
  return (
    <div className="bg-background  min-h-screen">
      <div className="flex justify-center h-screen">
        {/* Lado esquerdo com imagem de fundo */}
        <div
          className="hidden bg-cover lg:block lg:w-1/2" // Imagem ocupa metade da tela
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        ></div>

        {/* Lado direito com formulário de login */}
        <div className="flex items-center w-full max-w-xl px-6 mx-auto lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-700 dark:text-white">
                MoveXpress
              </h2>
              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Logue para acessar a plataforma
              </p>
            </div>

            <div className="mt-8">
              <FormLoginDeliveryMan />
              <div className="mt-6 text-sm text-center text-gray-400 flex items-center justify-center gap-2">
                Não tem conta ainda?{" "}
                <DialogRegisterDeliveryMan
                  Trigger={
                    <span className="text-orange-500 hover:underline">
                      Registre-se
                    </span>
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <ThemeToggleButton />
    </div>
  );
}
