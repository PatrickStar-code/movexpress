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
      question: "Como funciona o processo de entrega na MoveXpress?",
      answer:
        "Você solicita uma coleta e um entregador disponível pega sua encomenda no local indicado, levando até o destino solicitado. O processo é simples e rápido.",
    },
    {
      question: "Preciso pagar taxas extras?",
      answer:
        "Não, na MoveXpress não há taxas extras ocultas. Você paga apenas pelo valor do serviço de entrega com base na distância e tempo estimado.",
    },
    {
      question: "Como me torno um entregador da MoveXpress?",
      answer:
        "Basta se cadastrar em nossa plataforma, fornecer suas informações e escolher sua disponibilidade. A MoveXpress fará a conexão com clientes que precisam de entregas.",
    },
    {
      question: "Posso agendar uma entrega com antecedência?",
      answer:
        "Sim, você pode agendar suas entregas com antecedência para garantir que o entregador esteja disponível no momento desejado.",
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
