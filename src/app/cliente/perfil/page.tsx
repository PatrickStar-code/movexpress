"use client";
import React, { useState } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";

// Schema de validação com Zod
const usuarioSchema = z.object({
  nome: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .email("Email inválido")
    .max(100, "O email deve ter no máximo 100 caracteres"),
  telefone: z
    .string()
    .min(14, "Telefone inválido")
    .max(15, "Telefone inválido"),
  cep: z.string().min(9, "CEP inválido").max(9, "CEP inválido"),
});

// Tipo inferido a partir do schema
type UsuarioFormData = z.infer<typeof usuarioSchema>;

// Interface para o modelo Usuario
interface Usuario {
  id: number;
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  cpf: string;
  cep?: string;
  foto?: string;
  login: string;
  criacao: Date;
}

// Função principal da página
export default function Perfil() {
  // Estado para armazenar os dados do usuário
  const [usuario, setUsuario] = useState<Usuario>({
    id: 1,
    nome: "João Silva",
    email: "joao.silva@example.com",
    senha: "********",
    telefone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    cep: "01234-567",
    foto: "https://via.placeholder.com/150",
    login: "joaosilva",
    criacao: new Date(),
  });

  // Estado para controlar a edição dos campos
  const [editando, setEditando] = useState(false);

  // Configuração do react-hook-form com Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone,
      cep: usuario.cep,
    },
  });

  // Função para alternar entre modo de edição e visualização
  const toggleEdicao = () => {
    setEditando((prev) => !prev);
    reset(); // Reseta o formulário ao entrar no modo de edição
  };

  // Função para formatar o telefone
  const formatarTelefone = (telefone: string) => {
    return telefone
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/^(\d{2})(\d)/g, "($1) $2") // Formata DDD
      .replace(/(\d{5})(\d)/, "$1-$2"); // Formata número
  };

  // Função para formatar o CEP
  const formatarCEP = (cep: string) => {
    return cep.replace(/\D/g, "").replace(/^(\d{5})(\d)/, "$1-$2");
  };

  // Função para formatar o CPF
  const formatarCPF = (cpf: string) => {
    return cpf
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  // Função para salvar as alterações
  const onSubmit: SubmitHandler<UsuarioFormData> = (data) => {
    const usuarioAtualizado = {
      ...usuario,
      nome: data.nome,
      email: data.email,
      telefone: data.telefone,
      cep: data.cep,
    };
    setUsuario(usuarioAtualizado);
    setEditando(false);
    console.log("Dados atualizados:", usuarioAtualizado);
  };

  return (
    <div className={`min-h-screen bg-[#0C0A09] p-6`}>
      <div className="max-w-6xl mx-auto">
        {/* Cabeçalho */}
        <div className="bg-[#1C1917] rounded-lg shadow-lg p-8 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Perfil do Cliente</h1>
            <button
              onClick={toggleEdicao}
              className="p-2 text-gray-400 hover:text-indigo-500 focus:outline-none"
            >
              {/* Ícone de caneta (edição) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          {/* Foto de perfil e informações básicas */}
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <Image
                src={usuario.foto || "https://via.placeholder.com/150"}
                width={150}
                height={150}
                alt="Foto do usuário"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-white">
                {usuario.nome}
              </h2>
              <p className="text-gray-400">{usuario.email}</p>
              <p className="text-gray-400">
                {formatarTelefone(usuario.telefone)}
              </p>
            </div>
          </div>
        </div>

        {/* Informações detalhadas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Informações Pessoais */}
          <div className="bg-[#1C1917] rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Informações Pessoais
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Nome Completo
                </label>
                {editando ? (
                  <>
                    <input
                      {...register("nome")}
                      type="text"
                      maxLength={100} // Limite de 100 caracteres
                      className="mt-1 block w-full px-3 py-2 bg-[#292524] border border-[#44403C] rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.nome && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.nome.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-white">{usuario.nome}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  CPF
                </label>
                <p className="mt-1 text-white">{formatarCPF(usuario.cpf)}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  CEP
                </label>
                {editando ? (
                  <>
                    <input
                      {...register("cep")}
                      type="text"
                      maxLength={9} // Limite de 9 caracteres (XXXXX-XXX)
                      className="mt-1 block w-full px-3 py-2 bg-[#292524] border border-[#44403C] rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => {
                        e.target.value = formatarCEP(e.target.value);
                      }}
                    />
                    {errors.cep && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.cep.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-white">
                    {formatarCEP(usuario.cep || "")}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Card: Contato */}
          <div className="bg-[#1C1917] rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Contato</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Email
                </label>
                {editando ? (
                  <>
                    <input
                      {...register("email")}
                      type="email"
                      maxLength={100} // Limite de 100 caracteres
                      className="mt-1 block w-full px-3 py-2 bg-[#292524] border border-[#44403C] rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-white">{usuario.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Telefone
                </label>
                {editando ? (
                  <>
                    <input
                      {...register("telefone")}
                      type="text"
                      maxLength={15} // Limite de 15 caracteres ((XX) XXXXX-XXXX)
                      className="mt-1 block w-full px-3 py-2 bg-[#292524] border border-[#44403C] rounded-md shadow-sm text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={(e) => {
                        e.target.value = formatarTelefone(e.target.value);
                      }}
                    />
                    {errors.telefone && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.telefone.message}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-white">
                    {formatarTelefone(usuario.telefone)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botão de salvar (visível apenas no modo de edição) */}
        {editando && (
          <div className="mt-6">
            <button
              onClick={handleSubmit(onSubmit)}
              className="w-full md:w-auto bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Salvar Alterações
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
