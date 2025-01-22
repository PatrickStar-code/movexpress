"use client";

import { motion } from "framer-motion";
import ThemeToggleButton from "./_components/toggleThemeButton";
import Image from "next/image";
import Link from "next/link";

export default function UserTypeSelection() {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const roles = [
    { name: "Cliente", image: "https://via.placeholder.com/150" },

    { name: "Entregador", image: "https://via.placeholder.com/150" },
    { name: "Administrador", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center transition-colors duration-300">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
          Selecione o Usuário
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {roles.map((role, index) => (
            <Link href={role.name.toLocaleLowerCase()} key={role.name}>
              <motion.div
                key={role.name}
                className="relative w-48 h-48 bg-gray-900 rounded-xl shadow-lg shadow-black overflow-hidden group"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover="hover"
              >
                <Image
                  src={role.image}
                  alt={role.name}
                  width={150}
                  height={150}
                  className="absolute inset-0 object-cover w-full h-full opacity-40 group-hover:opacity-20 transition-opacity"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-lg font-semibold text-gray-100 group-hover:text-[#D3500C]">
                    {role.name}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
      <ThemeToggleButton />
    </div>
  );
}
