"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/app/_components/ui/input";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { toast } from "react-toastify";
import {
  FaTruck,
  FaMapMarkerAlt,
  FaDollarSign,
  FaSpinner,
} from "react-icons/fa";
import calculateDeliveryValue from "../_actions/calculateDeliveryValue";
import AddNewDelivery from "../_actions/addNewDelivery";

export type TDataFormated = {
  distancia_km: number;
  valor_descontado?: number;
  tempo_minutos: number;
} & TDeliveryForm;

// Esquema de validação
const deliverySchema = z.object({
  descricao: z
    .string({ required_error: "A descrição é obrigatória" })
    .min(5, "A descrição deve ter pelo menos 5 caracteres"),
  peso: z
    .number({
      invalid_type_error: "O peso deve ser um número",
      required_error: "O peso é obrigatório",
    })
    .positive("O peso deve ser um valor positivo")

    .max(12, "O peso máximo é 12 kg"),
  cep_origem: z
    .string({ required_error: "O CEP é obrigatório" })
    .max(8, "CEP inválido"),
  numero_origem: z
    .number({
      invalid_type_error: "O numero da origem deve ser um número",
      required_error: "O numero da origem é obrigatório",
    })
    .int("Deve ser um número inteiro"),
  bairro_origem: z.string({ required_error: "O bairro é obrigatório" }),
  logradouro_origem: z.string({ required_error: "O logradouro é obrigatório" }),
  cidade_origem: z.string({ required_error: "A cidade é obrigatória" }),
  uf_origem: z.string({ required_error: "A UF é obrigatória" }),
  cep_destino: z
    .string({ required_error: "O CEP é obrigatório" })
    .max(8, "CEP inválido"),
  numero_destino: z
    .number({
      invalid_type_error: "O numero do destino deve ser um número",
      required_error: "O numero do destino é obrigatório",
    })
    .int("Deve ser um número inteiro"),
  bairro_destino: z
    .string({ required_error: "O bairro é obrigatório" })
    .min(2, "O bairro é obrigatório"),
  logradouro_destino: z.string({
    required_error: "O logradouro é obrigatório",
  }),
  cidade_destino: z.string({
    required_error: "A cidade é obrigatória",
  }),
  uf_destino: z.string({
    required_error: "A UF é obrigatória",
  }),
  valor_total: z.number({
    invalid_type_error: "Gere o valor total",
    required_error: "O valor total é obrigatório",
  }),
});

export type TDeliveryForm = z.infer<typeof deliverySchema>;

export function DeliveryForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // Estado para o loading
  const isDark = document.documentElement.classList.contains("dark");
  const [deliveryLoading, setDeliveryLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);
  const [containsError, setContainsError] = useState(false);

  const values = {
    descricao: "",
    cep_origem: "",
    bairro_origem: "",
    logradouro_origem: "",
    cidade_origem: "",
    uf_origem: "",
    cep_destino: "",
    bairro_destino: "",
    logradouro_destino: "",
    cidade_destino: "",
    uf_destino: "",
    valor_total: 0,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
    reset,
  } = useForm<TDeliveryForm>({
    resolver: zodResolver(deliverySchema),
    mode: "onChange",
    defaultValues: values,
  });

  const cepOrigem = watch("cep_origem");
  const cepDestino = watch("cep_destino");
  const peso = watch("peso");

  useEffect(() => {
    if (cepOrigem && cepOrigem.length === 8) {
      fetchAddress(cepOrigem, "origem");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepOrigem]);

  useEffect(() => {
    if (cepDestino && cepDestino.length === 8) {
      fetchAddress(cepDestino, "destino");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepDestino]);

  const fetchAddress = async (cep: string, type: "origem" | "destino") => {
    setLoading(true); // Ativa o loading
    try {
      // Limpa os campos
      setValue(`bairro_${type}`, "");
      setValue(`logradouro_${type}`, "");
      setValue(`cidade_${type}`, "");
      setValue(`uf_${type}`, "");
      const cepReplaced = cep.replace("-", "");

      const response = await fetch(
        `https://viacep.com.br/ws/${cepReplaced}/json/`
      );
      const data = await response.json();

      if (data.erro) {
        toast.error("CEP não encontrado", { theme: isDark ? "dark" : "light" });
        return;
      }

      // Preenche os campos de endereço
      setValue(`bairro_${type}`, data.bairro);
      setValue(`logradouro_${type}`, data.logradouro);
      setValue(`cidade_${type}`, data.localidade);
      setValue(`uf_${type}`, data.uf);

      // Dispara a validação dos campos
      trigger(`bairro_${type}`);
      trigger(`logradouro_${type}`);
      trigger(`cidade_${type}`);
      trigger(`uf_${type}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      toast.error("Erro ao buscar rota entre endereços tente outra vez", {
        theme: isDark ? "dark" : "light",
      });
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  const formatCEP = (cep: string) => {
    return cep.replace(/\D/g, "").slice(0, 8); // Remove não dígitos e limita a 8 caracteres
  };

  const onSubmit = (data: TDeliveryForm) => {
    try {
      setFormLoading(true);
      const dataFormated = {
        ...data,
        distancia_km: distance,
        tempo_minutos: duration,
      };

      AddNewDelivery(dataFormated);
      toast.success("Entrega cadastrada com sucesso!", {
        theme: isDark ? "dark" : "light",
      });
    } catch (error: any) {
      toast.error(error.message, { theme: isDark ? "dark" : "light" });
    } finally {
      setStep(1);
      reset();
      setFormLoading(false);
    }
  };

  console.log(containsError);
  // Use useEffect para realizar o cálculo quando distance ou duration mudarem
  const calcularValorTotal = async () => {
    try {
      setContainsError(false);
      setDeliveryLoading(true); // Ativa o loading

      // Busca a distância e a duração
      const res = await fetch(
        `/api/distancia?origem=${cepOrigem}&destino=${cepDestino}`
      );
      const data = await res.json();

      const distanceText = data.rows[0].elements[0].distance.text;
      const durationText = data.rows[0].elements[0].duration.text;

      // Atualiza os valores de distância e duração
      setDistance(parseFloat(distanceText));
      setDuration(convertDurationToMinutes(durationText));

      // Calcula o valor total
      const total = await calculateDeliveryValue({
        distancia: parseFloat(distanceText),
        tempo_transporte: convertDurationToMinutes(durationText),
        peso: peso,
      });

      setValue("valor_total", total); // Atualiza o valor total no formulário
    } catch (error: any) {
      toast.error(error.message, {
        theme: isDark ? "dark" : "light",
      });
      setContainsError(true);
    } finally {
      setDeliveryLoading(false);
    }
  };

  // Função para converter duração no formato "X hours Y mins" para minutos
  const convertDurationToMinutes = (durationText: string): number => {
    // Divide a string em partes
    const parts = durationText.split(" ");

    let hours = 0;
    let minutes = 0;

    // Itera sobre as partes para extrair horas e minutos
    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === "hours" || parts[i] === "hour") {
        hours = parseFloat(parts[i - 1]); // Pega o valor antes de "hours" ou "hour"
      }
      if (parts[i] === "mins" || parts[i] === "min") {
        minutes = parseFloat(parts[i - 1]); // Pega o valor antes de "mins" ou "min"
      }
    }

    // Converte horas para minutos e soma com os minutos
    return hours * 60 + minutes;
  };

  const handleNextStep = async () => {
    // Definindo os campos a serem validados com base no passo atual
    const fieldsToValidate: (keyof TDeliveryForm)[] =
      step === 1
        ? ["descricao", "peso"]
        : step === 2
        ? ["cep_origem", "numero_origem"]
        : step === 3
        ? [
            "cep_destino",
            "numero_destino",
            "bairro_destino",
            "logradouro_destino",
          ]
        : ["valor_total"];

    // Usando o operador de propagação para passar os campos como argumentos separados
    const isValid = await trigger(fieldsToValidate as (keyof TDeliveryForm)[]);
    if (isValid) {
      if (step === 3) {
        await calcularValorTotal();
      } else if (!containsError) {
        setStep((prev) => prev + 1);
      }
    } else {
      toast.error("Preencha os campos obrigatórios.", {
        theme: isDark ? "dark" : "light",
      });
    }
  };

  const handlePrevStep = () => setStep((prev) => prev - 1);

  const isStepValid = () => {
    switch (step) {
      case 1:
        return !errors.descricao && !errors.peso;
      case 2:
        return !errors.cep_origem && !errors.numero_origem;
      case 3:
        return (
          !errors.cep_destino &&
          !errors.numero_destino &&
          !errors.bairro_destino &&
          !errors.logradouro_destino
        );
      case 4:
        return !errors.valor_total;
      default:
        return false;
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg rounded-lg">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex justify-center space-x-4 mb-6">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step === s
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                <FaTruck /> Detalhes da Entrega
              </h2>
              <div className="space-y-4">
                <Input
                  placeholder="Descrição"
                  {...register("descricao")}
                  className={`w-ful ${
                    errors.descricao ? "border-red-500" : ""
                  }  md:w-[20rem] lg:w-[20rem] h-12  text-lg`}
                  required
                />
                {errors.descricao && (
                  <p className="text-red-500 text-sm">
                    {errors.descricao.message}
                  </p>
                )}

                <Input
                  required
                  type="number"
                  min={0}
                  placeholder="Peso (kg)"
                  {...register("peso", { valueAsNumber: true })}
                  className={`w-ful md:w-[20rem] lg:w-[20rem] h-12 text-lg ${
                    errors.peso ? "border-red-500" : ""
                  }`}
                />
                {errors.peso && (
                  <p className="text-red-500 text-sm">{errors.peso.message}</p>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                <FaMapMarkerAlt /> Endereço de Origem
              </h2>
              <div className="space-y-4">
                <Input
                  required
                  placeholder="CEP Origem"
                  {...register("cep_origem")}
                  className={`${
                    errors.cep_origem ? "border-red-500" : ""
                  } w-ful lg:w-[20rem] md:w-[20rem] h-12 text-lg `}
                  onChange={(e) => {
                    const formattedCEP = formatCEP(e.target.value);
                    setValue("cep_origem", formattedCEP);
                  }}
                  maxLength={8} // Limita o input a 8 caracteres
                />
                {errors.cep_origem && (
                  <p className="text-red-500 text-sm">
                    {errors.cep_origem.message}
                  </p>
                )}

                <Input
                  type="number"
                  placeholder="Número"
                  required
                  {...register("numero_origem", { valueAsNumber: true })}
                  className={`w-full h-12 text-lg md:w-[20rem] ${
                    errors.numero_origem ? "border-red-500" : ""
                  }`}
                />
                {errors.numero_origem && (
                  <p className="text-red-500 text-sm">
                    {errors.numero_origem.message}
                  </p>
                )}

                <Input
                  placeholder="Bairro"
                  required
                  {...register("bairro_origem")}
                  className={`w-ful lg:w-[20rem] md:w-[20rem] h-12 text-lg ${
                    errors.bairro_origem ? "border-red-500" : ""
                  }`}
                  disabled
                />
                {errors.bairro_origem && (
                  <p className="text-red-500 text-sm">
                    {errors.bairro_origem.message}
                  </p>
                )}

                <Input
                  placeholder="Logradouro"
                  required
                  {...register("logradouro_origem")}
                  className={`w-ful lg:w-[20rem] h-12 text-lg md:w-[20rem] ${
                    errors.logradouro_origem ? "border-red-500" : ""
                  }`}
                  disabled
                />
                {errors.logradouro_origem && (
                  <p className="text-red-500 text-sm">
                    {errors.logradouro_origem.message}
                  </p>
                )}

                <Input
                  placeholder="Cidade"
                  required
                  {...register("cidade_origem")}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                  disabled
                />
                {errors.cidade_origem && (
                  <p className="text-red-500 text-sm">
                    {errors.cidade_origem.message}
                  </p>
                )}

                <Input
                  placeholder="UF"
                  required
                  {...register("uf_origem")}
                  className={`w-ful lg:w-[20rem] md:w-[20rem] h-12 text-lg ${
                    errors.uf_origem ? "border-red-500" : ""
                  } `}
                  disabled
                />
                {errors.uf_origem && (
                  <p className="text-red-500 text-sm">
                    {errors.uf_origem.message}
                  </p>
                )}

                {loading && (
                  <div className="flex justify-center">
                    Carregando dados do cep ...{" "}
                    <FaSpinner className="animate-spin" />
                  </div>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                <FaMapMarkerAlt /> Endereço de Destino
              </h2>
              <div className="space-y-4">
                <Input
                  required
                  placeholder="CEP Destino"
                  {...register("cep_destino")}
                  className={`w-ful lg:w-[20rem] h-12 text-lg md:w-[20rem] ${
                    errors.cep_destino ? "border-red-500" : ""
                  }`}
                  onChange={(e) => {
                    const formattedCEP = formatCEP(e.target.value);
                    setValue("cep_destino", formattedCEP);
                  }}
                  maxLength={8}
                />
                {errors.cep_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.cep_destino.message}
                  </p>
                )}

                <Input
                  type="number"
                  placeholder="Número"
                  required
                  {...register("numero_destino", { valueAsNumber: true })}
                  className={`w-ful lg:w-[20rem] h-12 text-lg md:w-[20rem] ${
                    errors.numero_destino ? "border-red-500" : ""
                  }`}
                />
                {errors.numero_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.numero_destino.message}
                  </p>
                )}

                <Input
                  placeholder="Bairro"
                  {...register("bairro_destino")}
                  required
                  className={`w-ful lg:w-[20rem] h-12 text-lg md:w-[20rem] ${
                    errors.bairro_destino ? "border-red-500" : ""
                  }`}
                  disabled
                />
                {errors.bairro_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.bairro_destino.message}
                  </p>
                )}

                <Input
                  placeholder="Logradouro"
                  {...register("logradouro_destino")}
                  required
                  className={`w-ful lg:w-[20rem] h-12 text-lg md:w-[20rem] ${
                    errors.logradouro_destino ? "border-red-500" : ""
                  }`}
                  disabled
                />
                {errors.logradouro_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.logradouro_destino.message}
                  </p>
                )}

                <Input
                  placeholder="Cidade"
                  {...register("cidade_destino")}
                  required
                  className={`w-ful lg:w-[20rem] h-12 text-lg md:w-[20rem] ${
                    errors.cidade_destino ? "border-red-500" : ""
                  } `}
                  disabled
                />
                {errors.cidade_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.cidade_destino.message}
                  </p>
                )}

                <Input
                  placeholder="UF"
                  {...register("uf_destino")}
                  required
                  className={`w-ful lg:w-[20rem] h-12 text-lg md:w-[20rem] ${
                    errors.uf_destino ? "border-red-500" : ""
                  }`}
                  disabled
                />
                {errors.uf_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.uf_destino.message}
                  </p>
                )}

                {loading && (
                  <div className="flex justify-center">
                    Carregando dados do cep ...{" "}
                    <FaSpinner className="animate-spin" />
                  </div>
                )}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                <FaDollarSign /> Valor Total
              </h2>
              <div className="flex items-center gap-4">
                {deliveryLoading ? (
                  <div className="flex justify-center">
                    Calculando valor total...{" "}
                    <FaSpinner className="animate-spin" />
                  </div>
                ) : (
                  <Input
                    type="number"
                    placeholder="Valor Total (R$)"
                    required
                    {...register("valor_total", { valueAsNumber: true })}
                    disabled
                    className={`w-ful lg:w-[20rem] h-12 text-lg md:w-[20rem] ${
                      errors.valor_total ? "border-red-500" : ""
                    }`}
                    defaultValue={0}
                  />
                )}
              </div>
              {errors.valor_total && (
                <p className="text-red-500 text-sm">
                  {errors.valor_total.message}
                </p>
              )}
            </>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                Voltar
              </Button>
            )}
            {step < 4 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={!isStepValid() || formLoading}
              >
                {deliveryLoading ? (
                  <>
                    Calculando total <FaSpinner className="animate-spin" />
                  </>
                ) : (
                  "Próximo"
                )}
              </Button>
            ) : (
              <Button
                type="submit"
                className="disabled:cursor-not-allowed"
                disabled={formLoading}
              >
                {formLoading ? (
                  <>
                    Enviando dados <FaSpinner className="animate-spin" />
                  </>
                ) : (
                  "Enviar"
                )}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
