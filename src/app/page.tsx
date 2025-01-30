"use client";

import { motion } from "framer-motion";
import ThemeToggleButton from "./_components/toggleThemeButton";
import Link from "next/link";
import {
  UserIcon,
  TruckIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function UserTypeSelection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
    hover: {
      scale: 1.05,
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
    },
    tap: { scale: 0.95 },
  };

  const roles = [
    {
      name: "Cliente",
      icon: UserIcon,
      color: "text-blue-500",
      path: "/cliente",
    },
    {
      name: "Entregador",
      icon: TruckIcon,
      color: "text-green-500",
      path: "/entregador",
    },
    {
      name: "Administrador",
      icon: ShieldCheckIcon,
      color: "text-purple-500",
      path: "/administrador",
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-4xl w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-foreground mb-8 md:mb-12"
        >
          Selecione seu Perfil
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.name}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              custom={index}
              className="relative"
            >
              <Link
                href={role.path}
                className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-xl"
                aria-label={`Selecionar perfil ${role.name}`}
              >
                <div className="h-64 md:h-72 bg-card rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center p-6 border border-border/50">
                  <role.icon
                    className={`h-16 w-16 mb-4 ${role.color} transition-colors duration-300`}
                    aria-hidden="true"
                  />
                  <span className="text-xl font-semibold text-foreground">
                    {role.name}
                  </span>
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/20"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="fixed top-4 right-4">
        <ThemeToggleButton />
      </div>
    </div>
  );
}
