"use client";
import React from "react";
import { motion } from "framer-motion";
import { Container } from "./Container";
import Link from "next/link";

export const Cta = ({ isLoged }: { isLoged: boolean }) => {
  return (
    <Container>
      <motion.div
        className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-orange-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            Pronto para começar com a MoveXpress?
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            Cadastre-se agora e experimente entregas rápidas!
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
          {isLoged ? (
            <button className="inline-block py-3 mx-auto text-lg font-medium text-center text-orange-600 bg-white rounded-md px-7 lg:px-10 lg:py-5">
              Solicitar Entrega
            </button>
          ) : (
            <Link
              href="cliente/cadastro"
              className="inline-block py-3 mx-auto text-lg font-medium text-center text-orange-600 bg-white rounded-md px-7 lg:px-10 lg:py-5"
            >
              Cadastre-se
            </Link>
          )}
        </div>
      </motion.div>
    </Container>
  );
};
