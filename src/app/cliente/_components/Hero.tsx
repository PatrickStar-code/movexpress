"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "./Container";
import HeroImg from "../../../../public/img/hero.png";
import { Button } from "@/app/_components/ui/button";

export const Hero = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <>
      <Container className="flex flex-wrap">
        <div className="flex items-center w-full lg:w-1/2" id="inicio">
          <motion.div
            className="max-w-2xl mb-8"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.h1
              className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white"
              variants={textVariants}
            >
              Entregas rápidas e seguras com a MoveXpress
            </motion.h1>
            <motion.p
              className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300"
              variants={textVariants}
            >
              Precisa enviar ou receber algo? Com a MoveXpress, você solicita um
              entregador para coletar e levar sua encomenda ao destino, de forma
              simples e eficiente.
            </motion.p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Button className="px-8 py-4 p-8 text-lg font-medium text-center text-white rounded-md">
                Download for Free
              </Button>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="flex items-center justify-center w-full lg:w-1/2"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <Image
            src={HeroImg}
            width="616"
            height="617"
            className="object-cover"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </motion.div>
      </Container>
    </>
  );
};
