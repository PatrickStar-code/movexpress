"use client";
import React from "react";
import { useState } from "react";
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
    .regex(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "Formato inválido (use XXX.XXX.XXX-XX)"
    ),
  email_usuario: z.string().email("Email inválido"),
  telefone_usuario: z
    .string()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato inválido (use (XX) XXXX-XXXX)")

    .or(z.literal("")),
  senha_usuario: z.string().min(6, "Senha deve ter 6 dígitos"),
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
    if (nums.length <= 3) return nums;
    if (nums.length <= 6) return `${nums.slice(0, 3)}.${nums.slice(3)}`;
    if (nums.length <= 9)
      return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(6)}`;
    return `${nums.slice(0, 3)}.${nums.slice(3, 6)}.${nums.slice(
      6,
      9
    )}-${nums.slice(9, 11)}`;
  };

  const formatTelefone = (value: string) => {
    const nums = value.replace(/\D/g, "").slice(0, 11);
    if (nums.length === 0) return "";
    if (nums.length <= 2) return `(${nums}`;
    if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    if (nums.length <= 10)
      return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`;
  };

  async function onSubmit(data: UsuarioFormData) {
    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    try {
      setIsLoading(true);
      await RegisterClient(data);
      toast.success("Cadastro realizado com sucesso!", { theme });
    } catch (error) {
      toast.error(error as string, { theme });
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
      className="w-full max-w-md dark:bg-white  backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-white/10"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Crie sua conta
        </h1>
        <p className="text-gray-600">
          Junte-se à nossa plataforma e comece a explorar
        </p>
      </div>

      <div className="space-y-5">
        {/* Nome do Usuário */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome completo
          </label>
          <div className="relative">
            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("nome_usuario")}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-gray-400"
              placeholder="Ex: João Silva"
            />
          </div>
          {errors.nome_usuario && (
            <p className="text-red-500 text-sm mt-1">
              {errors.nome_usuario.message}
            </p>
          )}
        </div>

        {/* Senha */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("senha_usuario")}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-gray-400"
              placeholder="***********"
              type="password"
            />
          </div>
          {errors.senha_usuario && (
            <p className="text-red-500 text-sm mt-1">
              {errors.senha_usuario.message}
            </p>
          )}
        </div>
        {/* CPF */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            CPF
          </label>
          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("cpf_usuario")}
              onInput={(e) => {
                e.currentTarget.value = formatCPF(e.currentTarget.value);
              }}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-gray-400"
              placeholder="000.000.000-00"
            />
          </div>
          {errors.cpf_usuario && (
            <p className="text-red-500 text-sm mt-1">
              {errors.cpf_usuario.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            E-mail
          </label>
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("email_usuario")}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-gray-400"
              placeholder="exemplo@email.com"
            />
          </div>
          {errors.email_usuario && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email_usuario.message}
            </p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefone
          </label>
          <div className="relative">
            <FiSmartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("telefone_usuario")}
              onInput={(e) => {
                e.currentTarget.value = formatTelefone(e.currentTarget.value);
              }}
              className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all placeholder:text-gray-400"
              placeholder="(00) 00000-0000"
            />
          </div>
          {errors.telefone_usuario && (
            <p className="text-red-500 text-sm mt-1">
              {errors.telefone_usuario.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full py-3 disabled:bg-orange-400  text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-purple-200"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              Criando....
              <div className="border-orange-300 h-8 w-8 animate-spin rounded-full border-8 border-t-orange-600" />
            </>
          ) : (
            "Criar conta"
          )}
        </Button>

        <p className="text-center text-gray-600 mt-6">
          Já tem uma conta?{" "}
          <Link
            href="/cliente"
            className="text-purple-600 hover:text-purple-700 font-medium underline underline-offset-4"
          >
            Faça login
          </Link>
        </p>
      </div>
    </motion.form>
  );
}
