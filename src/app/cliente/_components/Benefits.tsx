"use client";
import Image from "next/image";
import React from "react";
import { Container } from "./Container";
import { motion } from "framer-motion";

interface BenefitsProps {
  imgPos?: "left" | "right";
  data: {
    imgPos?: "left" | "right";
    title: string;
    desc: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    image: any;
    bullets: {
      title: string;
      desc: string;
      icon: React.ReactNode;
    }[];
  };
}

export const Benefits = (props: Readonly<BenefitsProps>) => {
  const { data } = props;

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInFromLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  const fadeInFromRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
      {/* Image Section */}
      <motion.div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          props.imgPos === "right" ? "lg:order-1" : ""
        }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={props.imgPos === "right" ? fadeInFromRight : fadeInFromLeft}
        transition={{ duration: 0.8 }}
      >
        <div>
          <Image
            src={data.image}
            width={521}
            height={521}
            alt="Benefits"
            className={"object-cover"}
            placeholder="blur"
            blurDataURL={data.image.src}
          />
        </div>
      </motion.div>

      {/* Text Section */}
      <motion.div
        className={`flex flex-wrap items-center w-full lg:w-1/2 ${
          data.imgPos === "right" ? "lg:justify-end" : ""
        }`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div>
          <div className="flex flex-col w-full mt-4">
            <motion.h3
              className="max-w-2xl mt-3 text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-4xl dark:text-white"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {data.title}
            </motion.h3>

            <motion.p
              className="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {data.desc}
            </motion.p>
          </div>

          <div className="w-full mt-5">
            {data.bullets.map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
              >
                <Benefit title={item.title} icon={item.icon}>
                  {item.desc}
                </Benefit>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Benefit(props: any) {
  return (
    <div className="flex items-start mt-8 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-[#F9802D] rounded-md w-11 h-11">
        {React.cloneElement(props.icon, {
          className: "w-7 h-7 text-indigo-50",
        })}
      </div>
      <div>
        <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {props.title}
        </h4>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          {props.children}
        </p>
      </div>
    </div>
  );
}
