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

// Esquema de validação
const deliverySchema = z.object({
  descricao: z.string().min(5, "A descrição deve ter pelo menos 5 caracteres"),
  peso: z.number().positive("O peso deve ser um valor positivo"),
  cep_origem: z.string().min(8, "CEP inválido").max(8, "CEP inválido"),
  numero_origem: z.number().int("Deve ser um número inteiro"),
  bairro_origem: z.string().optional(),
  logradouro_origem: z.string().optional(),
  cidade_origem: z.string().optional(),
  uf_origem: z.string().optional(),
  cep_destino: z.string().min(8, "CEP inválido").max(8, "CEP inválido"),
  numero_destino: z.number().int("Deve ser um número inteiro"),
  bairro_destino: z.string().min(2, "O bairro é obrigatório"),
  logradouro_destino: z.string().min(2, "O logradouro é obrigatório"),
  cidade_destino: z.string().optional(),
  uf_destino: z.string().optional(),
  valor_total: z.number().positive("O valor deve ser positivo"),
});

type TDeliveryForm = z.infer<typeof deliverySchema>;

export function DeliveryForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // Estado para o loading
  const isDark = document.documentElement.classList.contains("dark");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    watch,
  } = useForm<TDeliveryForm>({
    resolver: zodResolver(deliverySchema),
    mode: "onChange",
  });

  const cepOrigem = watch("cep_origem");
  const cepDestino = watch("cep_destino");

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
      const cepReplaced = cep.replace("-", "");
      const response = await fetch(
        `https://viacep.com.br/ws/${cepReplaced}/json/`
      );
      const data = await response.json();
      console.log(data);

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
    } catch (error) {
      toast.error("Erro ao buscar endereço", {
        theme: isDark ? "dark" : "light",
      });
      console.log(error);
    } finally {
      setLoading(false); // Desativa o loading
    }
  };

  const formatCEP = (cep: string) => {
    return cep.replace(/\D/g, "").slice(0, 8); // Remove não dígitos e limita a 8 caracteres
  };

  const onSubmit = (data: TDeliveryForm) => {
    console.log("Dados enviados:", data);
    toast.success("Entrega cadastrada com sucesso!", {
      theme: isDark ? "dark" : "light",
    });
  };

  const fetchValorTotal = async () => {
    const valorTotal = 150.75;
    setValue("valor_total", valorTotal);
    await trigger("valor_total");
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
    if (isValid) setStep((prev) => prev + 1);
    else
      toast.error("Preencha os campos obrigatórios.", {
        theme: isDark ? "dark" : "light",
      });
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
                    ? "bg-blue-500 text-white"
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
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                />
                {errors.descricao && (
                  <p className="text-red-500 text-sm">
                    {errors.descricao.message}
                  </p>
                )}

                <Input
                  type="number"
                  placeholder="Peso (kg)"
                  {...register("peso", { valueAsNumber: true })}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
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
                  placeholder="CEP Origem"
                  {...register("cep_origem")}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
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
                  {...register("numero_origem", { valueAsNumber: true })}
                  className="w-full h-12 text-lg "
                />
                {errors.numero_origem && (
                  <p className="text-red-500 text-sm">
                    {errors.numero_origem.message}
                  </p>
                )}

                <Input
                  placeholder="Bairro"
                  {...register("bairro_origem")}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                  disabled
                />
                {errors.bairro_origem && (
                  <p className="text-red-500 text-sm">
                    {errors.bairro_origem.message}
                  </p>
                )}

                <Input
                  placeholder="Logradouro"
                  {...register("logradouro_origem")}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                  disabled
                />
                {errors.logradouro_origem && (
                  <p className="text-red-500 text-sm">
                    {errors.logradouro_origem.message}
                  </p>
                )}

                <Input
                  placeholder="Cidade"
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
                  {...register("uf_origem")}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                  disabled
                />
                {errors.uf_origem && (
                  <p className="text-red-500 text-sm">
                    {errors.uf_origem.message}
                  </p>
                )}

                {loading && (
                  <div className="flex justify-center">
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
                  placeholder="CEP Destino"
                  {...register("cep_destino")}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                  onChange={(e) => {
                    const formattedCEP = formatCEP(e.target.value);
                    setValue("cep_destino", formattedCEP);
                  }}
                  maxLength={8} // Limita o input a 8 caracteres
                />
                {errors.cep_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.cep_destino.message}
                  </p>
                )}

                <Input
                  type="number"
                  placeholder="Número"
                  {...register("numero_destino", { valueAsNumber: true })}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                />
                {errors.numero_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.numero_destino.message}
                  </p>
                )}

                <Input
                  placeholder="Bairro"
                  {...register("bairro_destino")}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                />
                {errors.bairro_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.bairro_destino.message}
                  </p>
                )}

                <Input
                  placeholder="Logradouro"
                  {...register("logradouro_destino")}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                />
                {errors.logradouro_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.logradouro_destino.message}
                  </p>
                )}

                <Input
                  placeholder="Cidade"
                  {...register("cidade_destino")}
                  className="w-ful lg:w-[20rem] h-12 text-lg"
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
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                  disabled
                />
                {errors.uf_destino && (
                  <p className="text-red-500 text-sm">
                    {errors.uf_destino.message}
                  </p>
                )}

                {loading && (
                  <div className="flex justify-center">
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
                <Input
                  type="number"
                  placeholder="Valor Total (R$)"
                  {...register("valor_total", { valueAsNumber: true })}
                  disabled
                  className="w-ful lg:w-[20rem] h-12 text-lg"
                />
                <Button type="button" onClick={fetchValorTotal}>
                  Calcular
                </Button>
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
                disabled={!isStepValid()}
              >
                Próximo
              </Button>
            ) : (
              <Button type="submit">Finalizar</Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
