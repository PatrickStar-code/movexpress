"use client";

import React from "react";
import { motion } from "framer-motion";

import { Container } from "./Container";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/app/_components/ui/accordion";

export const Faq = () => {
  const faqdata = [
    {
      question: "Is this template completely free to use?",
      answer: "Yes, this template is completely free to use.",
    },
    {
      question: "Can I use it in a commercial project?",
      answer: "Yes, this you can.",
    },
    {
      question: "What is your refund policy?",
      answer:
        "If you're unhappy with your purchase for any reason, email us within 90 days and we'll refund you in full, no questions asked.",
    },
    {
      question: "Do you offer technical support?",
      answer:
        "No, we don't offer technical support for free downloads. Please purchase a support plan to get 6 months of support.",
    },
  ];

  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        <Accordion type="single" collapsible>
          {faqdata.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="dark:text-white">
                {item.question}
              </AccordionTrigger>
              <motion.div
                className="overflow-hidden"
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                variants={{
                  collapsed: { height: 0, opacity: 0 },
                  expanded: { height: "auto", opacity: 1 },
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <AccordionContent className="dark:text-white dark:bg-[#0C0A09]">
                  {item.answer}
                </AccordionContent>
              </motion.div>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
};
