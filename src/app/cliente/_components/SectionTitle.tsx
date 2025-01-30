"use client";
import React from "react";
import { Container } from "./Container";
import { motion } from "framer-motion";

interface SectionTitleProps {
  preTitle?: string;
  title?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export const SectionTitle = ({
  preTitle,
  title,
  align = "center",
  children,
}: SectionTitleProps) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container
      className={`flex w-full flex-col mt-4 ${
        align === "left"
          ? "text-left"
          : "text-center items-center justify-center"
      }`}
    >
      {preTitle && (
        <motion.div
          className="text-sm font-bold tracking-wider text-[#F9802D] uppercase"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {preTitle}
        </motion.div>
      )}

      {title && (
        <motion.h2
          className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {title}
        </motion.h2>
      )}

      {children && (
        <motion.p
          className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-400"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {children}
        </motion.p>
      )}
    </Container>
  );
};
