"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { z } from "zod";
import Stepper from "./stepper";

// Funções de formatação

const onlyNumberInput = (event: ChangeEvent<HTMLInputElement>) => {
  event.target.value = event.target.value
    .replace(/[^0-9.]/g, "")
    .replace(/(\..*?)\..*/g, "$1");
};

const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/(\d{3})(\d)/, "$1.$2") // Coloca um ponto após os primeiros 3 dígitos
    .replace(/(\d{3})(\d)/, "$1.$2") // Coloca um ponto após os próximos 3 dígitos
    .replace(/(\d{3})(\d{1,2})/, "$1-$2") // Coloca um hífen antes dos últimos 2 dígitos
    .slice(0, 14); // Limita o tamanho do CPF
};

const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/(\d{5})(\d)/, "$1-$2") // Coloca um hífen após os primeiros 5 dígitos
    .slice(0, 9); // Limita o tamanho do CEP
};

const formatTelefone = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove tudo que não é dígito
    .replace(/(\d{2})(\d)/, "($1) $2") // Coloca parênteses em volta dos dois primeiros dígitos
    .replace(/(\d{5})(\d)/, "$1-$2") // Coloca um hífen após os próximos 5 dígitos
    .slice(0, 15); // Limita o tamanho do telefone
};

const formatPlaca = (placa: string) => {
  // Remove caracteres inválidos
  placa = placa.toUpperCase().replace(/[^A-Z0-9]/g, "");

  if (placa.length <= 3) {
    return placa; // Apenas as letras iniciais
  }

  if (placa.length <= 7) {
    // Decide se o formato será do modelo antigo ou Mercosul
    if (/^[A-Z]{3}\d{1}[A-Z]{1}\d{2}$/.test(placa)) {
      return placa; // Formato Mercosul (ABC1D23)
    } else {
      return placa.replace(/([A-Z]{3})(\d{0,4})/, "$1-$2"); // Formato antigo (ABC-1234)
    }
  }

  return placa.substring(0, 7); // Limita a 7 caracteres
};

function updatePlaca(event: React.FormEvent<HTMLInputElement>) {
  const input = event.currentTarget;
  input.value = formatPlaca(input.value);
}

const formatAgencia = (agencia: string) => {
  return agencia.replace(/\D/g, "").slice(0, 5); // Apenas números, limite de 5 dígitos
};

const formatConta = (conta: string) => {
  // Remove caracteres não numéricos
  conta = conta.replace(/\D/g, "");

  // Define os limites de caracteres para conta (6 a 10 números + hífen)
  if (conta.length <= 6) {
    return conta; // Exibe normalmente se for menor que 6 dígitos
  }

  // Insere o hífen antes do último número
  return conta.replace(/^(\d+)(\d)$/, "$1-$2");
};

const updateAgencia = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.value = formatAgencia(event.currentTarget.value);
};

const updateConta = (event: React.FormEvent<HTMLInputElement>) => {
  event.currentTarget.value = formatConta(event.currentTarget.value);
};

// Esquemas de validação para cada etapa
export const Step1Schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  cpf: z.string().min(11, "CPF deve ter 11 caracteres"),
});

export const Step2Schema = z.object({
  placa_veiculo: z.string().min(1, "Placa do veiculo é obrigatória"),
  cnh: z.string().min(9, "CNH é obrigatória"),
  cnh_foto: z.string().min(1, "Foto da CNH é obrigatória"),
  conta_corrente: z.string().min(1, "Conta corrente é obrigatória"),
  agencia: z.string().min(1, "Agência é obrigatória"),
});

export const Step3Schema = z.object({
  cep: z.string(),
  foto: z.string().optional(),
  login: z.string().min(1, "Login é obrigatório"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export const FormSchema = z.object({
  step1: Step1Schema,
  step2: Step2Schema,
  step3: Step3Schema,
});

export default function FormRegisterDeliveryMan() {
  const [step, setStep] = useState(1);

  const {
    control,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      step1: {
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
      },
      step2: {
        placa_veiculo: "",
        cnh: "",
        cnh_foto: "",
        conta_corrente: "",
        agencia: "",
      },
      step3: {
        cep: "",
        foto: "",
        login: "",
        senha: "",
      },
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data) => {
    console.log("Form data submitted:", data);
  };

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger("step1");
    } else if (step === 2) {
      isValid = await trigger("step2");
    } else if (step === 3) {
      isValid = await trigger("step3");
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div className=" bg-gray-100  ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl mx-auto bg-background p-8  shadow-lg"
      >
        <Stepper step={step} />

        {/* Passo 1 */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <h2 className="text-xl font-bold mb-4 col-span-full text-gray-900 dark:text-white">
              Passo 1: Informações Pessoais
            </h2>
            <Controller
              name="step1.nome"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Nome
                  </label>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step1?.nome && (
                    <p className="text-red-500 text-sm">
                      {errors.step1.nome.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="step1.email"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <input
                    {...field}
                    type="email"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step1?.email && (
                    <p className="text-red-500 text-sm">
                      {errors.step1.email.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="step1.telefone"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Telefone
                  </label>
                  <input
                    {...field}
                    type="tel"
                    onChange={(e) => {
                      field.onChange(formatTelefone(e.target.value));
                    }}
                    value={field.value}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step1?.telefone && (
                    <p className="text-red-500 text-sm">
                      {errors.step1.telefone.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="step1.cpf"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    CPF
                  </label>
                  <input
                    {...field}
                    type="text"
                    onChange={(e) => {
                      field.onChange(formatCPF(e.target.value));
                    }}
                    value={field.value}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step1?.cpf && (
                    <p className="text-red-500 text-sm">
                      {errors.step1.cpf.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        )}

        {/* Passo 2 */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <h2 className="text-xl font-bold mb-4 col-span-full text-gray-900 dark:text-white">
              Passo 2: Informações da Moto e CNH
            </h2>
            <Controller
              name="step2.placa_veiculo"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Placa do Veículo
                  </label>
                  <input
                    {...field}
                    type="text"
                    onInput={updatePlaca}
                    value={field.value}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step2?.placa_veiculo && (
                    <p className="text-red-500 text-sm">
                      {errors.step2.placa_veiculo.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="step2.cnh"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Número do CNH
                  </label>
                  <input
                    {...field}
                    type="string"
                    maxLength={9}
                    onInput={onlyNumberInput}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step2?.cnh && (
                    <p className="text-red-500 text-sm">
                      {errors.step2.cnh.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="step2.cnh_foto"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Foto da CNH
                  </label>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step2?.cnh_foto && (
                    <p className="text-red-500 text-sm">
                      {errors.step2.cnh_foto.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="step2.conta_corrente"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Conta Corrente
                  </label>
                  <input
                    {...field}
                    type="text"
                    maxLength={11}
                    onInput={updateConta}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step2?.conta_corrente && (
                    <p className="text-red-500 text-sm">
                      {errors.step2.conta_corrente.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="step2.agencia"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Agência
                  </label>
                  <input
                    {...field}
                    type="text"
                    maxLength={5}
                    onInput={updateAgencia}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step2?.agencia && (
                    <p className="text-red-500 text-sm">
                      {errors.step2.agencia.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        )}

        {/* Passo 3 */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <h2 className="text-xl font-bold mb-4 col-span-full text-gray-900 dark:text-white">
              Passo 3: Informações Adicionais
            </h2>
            <Controller
              name="step3.cep"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    CEP
                  </label>
                  <input
                    {...field}
                    type="text"
                    onChange={(e) => {
                      field.onChange(formatCEP(e.target.value));
                    }}
                    value={field.value}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step3?.cep && (
                    <p className="text-red-500 text-sm">
                      {errors.step3.cep.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="step3.foto"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Foto
                  </label>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step3?.foto && (
                    <p className="text-red-500 text-sm">
                      {errors.step3.foto.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="step3.login"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Login
                  </label>
                  <input
                    {...field}
                    type="text"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step3?.login && (
                    <p className="text-red-500 text-sm">
                      {errors.step3.login.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="step3.senha"
              control={control}
              render={({ field }) => (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                    Senha
                  </label>
                  <input
                    {...field}
                    type="password"
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                  {errors.step3?.senha && (
                    <p className="text-red-500 text-sm">
                      {errors.step3.senha.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        )}

        {/* Botões de navegação */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Anterior
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Próximo
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Enviar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
