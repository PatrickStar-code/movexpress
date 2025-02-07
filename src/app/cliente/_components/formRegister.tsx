/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiSmartphone, FiLock } from "react-icons/fi";
import RegisterClient from "../_actions/register";
import { Button } from "@/app/_components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const usuarioSchema = z.object({
  nome_usuario: z.string().min(1, "Nome é obrigatório"),
  cpf_usuario: z
    .string()
    .min(11, "CPF deve ter 11 dígitos")
    .max(14, "CPF inválido")
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/, "Formato inválido"),
  login_usuario: z.string().min(6, "Login é obrigatório"),
  email_usuario: z.string().email("Email inválido"),
  telefone_usuario: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$|^\d{10,11}$/, "Formato inválido"),
  senha_usuario: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export type UsuarioFormData = z.infer<typeof usuarioSchema>;

export default function FormRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
  });

  const formatCPF = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11);
    return nums.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatTelefone = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11);
    return nums.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
  };

  async function onSubmit(data: UsuarioFormData) {
    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    try {
      setIsLoading(true);
      await RegisterClient({
        ...data,
        cpf_usuario: data.cpf_usuario.replace(/\D/g, ""),
        telefone_usuario: data.telefone_usuario.replace(/\D/g, ""),
      });
      toast.success("Cadastro realizado com sucesso!", { theme });
    } catch (error: any) {
      console.error(error);
      toast.error(error.message, { theme });
    } finally {
      setIsLoading(false);
      reset();
    }
  }

  return (
    <motion.form
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white/90 dark:bg-gray-900 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/10"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-6">
        Crie sua conta
      </h1>

      {[
        { label: "Nome completo", name: "nome_usuario", icon: FiUser },
        { label: "Login", name: "login_usuario", icon: FiUser },
        {
          label: "Senha",
          name: "senha_usuario",
          icon: FiLock,
          type: "password",
        },
        { label: "CPF", name: "cpf_usuario", icon: FiLock, format: formatCPF },
        { label: "E-mail", name: "email_usuario", icon: FiMail },
        {
          label: "Telefone",
          name: "telefone_usuario",
          icon: FiSmartphone,
          format: formatTelefone,
        },
      ].map(({ label, name, icon: Icon, type = "text", format }) => (
        <div key={name} className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <div className="relative">
            <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register(name as keyof UsuarioFormData)}
              onInput={(e) => {
                if (format)
                  e.currentTarget.value = format(e.currentTarget.value);
              }}
              type={type}
              className="w-full pl-10 pr-4 py-3 bg-white/50 dark:bg-gray-800 text-black dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder:text-gray-400"
              placeholder={label}
            />
          </div>
          {errors[name as keyof UsuarioFormData] && (
            <p className="text-red-500 text-sm mt-1">
              {errors[name as keyof UsuarioFormData]?.message as string}
            </p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        className="w-full mt-4 py-3 text-white font-semibold rounded-xl bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 transition-all transform hover:scale-[1.02] shadow-lg"
      >
        {isLoading ? "Criando..." : "Criar conta"}
      </Button>

      <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
        Já tem uma conta?{" "}
        <Link
          href="/cliente"
          className="text-orange-600 hover:text-orange-700 font-medium underline underline-offset-4"
        >
          Faça login
        </Link>
      </p>
    </motion.form>
  );
}
