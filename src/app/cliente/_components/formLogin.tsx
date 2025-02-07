"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/button";
import LoginClient from "../_actions/login";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

// Definindo o schema de validação com Zod
const loginSchema = z.object({
  login: z.string().min(6, "Este campo deve ter no mínimo 6 caracteres"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// Tipagem para o formulário
export type TFormDataLogin = z.infer<typeof loginSchema>;

export default function FormLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const Router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormDataLogin>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: TFormDataLogin) {
    const theme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    try {
      setIsLoading(true);
      await LoginClient(data);
      toast.success("Login Realizado com sucesso!", { theme });
      Router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      toast.error(error.message, { theme });
    } finally {
      setIsLoading(false);
      reset();
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="login"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Login
        </label>
        <input
          id="login"
          {...register("login")}
          type="text"
          className="mt-2 block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          placeholder="Digite seu login"
        />
        {errors.login && (
          <p className="mt-1 text-sm text-red-500">{errors.login.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Senha
        </label>
        <input
          id="password"
          {...register("password")}
          type="password"
          className="mt-2 block w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 placeholder-gray-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          placeholder="Digite sua senha"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full py-3 px-4  text-white rounded-md  focus:outline-none  disabled:bg-orange-400 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
