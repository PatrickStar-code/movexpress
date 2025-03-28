/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

import userOneImg from "../../../../public/img/user1.jpg";
import userTwoImg from "../../../../public/img/user2.jpg";
import userThreeImg from "../../../../public/img/user3.jpg";
import { Container } from "./Container";

export const Testimonials = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Container>
      <motion.div
        className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.div
          className="lg:col-span-2 xl:col-auto"
          variants={containerVariants}
        >
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-gray-800">
            <p className="text-2xl leading-normal">
              A MoveXpress tem sido a solução ideal para nossas entregas! A
              rapidez e a segurança do serviço são excepcionais. A facilidade de
              acompanhar a entrega em tempo real é um grande diferencial.
            </p>

            <Avatar
              image={userOneImg}
              name="Sarah Steiner"
              title="Cliente MoveXpress"
            />
          </div>
        </motion.div>

        <motion.div className="" variants={containerVariants}>
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-gray-800">
            <p className="text-2xl leading-normal">
              &quot;Com a MoveXpress, encontrei a solução perfeita para realizar
              entregas rápidas e seguras. O processo é simples e transparente.
              &quot;
            </p>

            <Avatar
              image={userTwoImg}
              name="Dylan Ambrose"
              title="Empreendedor"
            />
          </div>
        </motion.div>

        <motion.div className="" variants={containerVariants}>
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-gray-800">
            <p className="text-2xl leading-normal">
              &quot;Eu sou muito grato pelo serviço da MoveXpress! A plataforma
              é fácil de usar, e os entregadores são sempre rápidos e
              confiáveis. &quot;
            </p>

            <Avatar
              image={userThreeImg}
              name="Gabrielle Winn"
              title="Empresária"
            />
          </div>
        </motion.div>
      </motion.div>
    </Container>
  );
};

interface AvatarProps {
  image: any;
  name: string;
  title: string;
}

function Avatar(props: Readonly<AvatarProps>) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600 dark:text-gray-400">{props.title}</div>
      </div>
    </div>
  );
}
