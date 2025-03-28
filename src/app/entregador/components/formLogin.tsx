import React from "react";
import { Loader2 } from "lucide-react"; // Ícone de carregamento
import { useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/app/_components/ui/label";
import { Input } from "@/app/_components/ui/input";
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
export default function FormLoginDeliveryMan() {
  const schema = z.object({
    login: z.string(),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Dados do formulário:", data);
    // Simulação de uma requisição assíncrona (como uma chamada à API)
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula 2 segundos de carregamento
    alert("Login realizado com sucesso!"); // Substitua por uma lógica real de autenticação
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label
          htmlFor="email"
          className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
        >
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="example@example.com"
          {...register("email")}
          className={`w-full px-4 py-3 text-lg ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">
            {errors.email.message as string}
            {/* Acessa a propriedade `message` */}
          </p>
        )}
      </div>

      <div>
        <div className="flex justify-between mb-2">
          <Label
            htmlFor="password"
            className="text-sm text-gray-600 dark:text-gray-200"
          >
            Senha
          </Label>
          <Link
            href="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Esqueceu a Senha?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="*******"
          {...register("password")}
          className={`w-full px-4 py-3 text-lg ${
            errors.password ? "border-red-500" : ""
          }`}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">
            {errors.password.message as string}
          </p>
        )}
      </div>

      <div>
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 py-3 text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logando...
            </>
          ) : (
            "Logar"
          )}
        </Button>
      </div>
    </form>
  );
}
