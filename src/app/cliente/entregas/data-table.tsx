"use client";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { HTMLAttributes } from "react";
import { ToastContentProps } from "react-toastify";

import {
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/app/_components/ui/pagination";

import { Button } from "@/app/_components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Input } from "@/app/_components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Badge } from "@/app/_components/ui/badge"; // Importando o Badge do ShadCN
import UseConvertMinutesToHours from "@/app/_hooks/useConvertMinutesToHours";
import { toast } from "react-toastify";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import { EntregaDetails } from "../_components/entregaDetails";
import DeleteDelivery from "../_actions/deleteDelivery";
import ConfirmationToast from "../_components/toastDelete";

export type Entrega = {
  id: number;
  descricao: string;
  peso: number;
  cep_origem: string;
  numero_origem: number;
  bairro_origem?: string | null;
  logradouro_origem?: string | null;
  cep_destino: string;
  numero_destino: number;
  bairro_destino?: string | null;
  logradouro_destino?: string | null;
  distancia_km: number; // Ajustado para number, se necessário
  tempo_minutos?: number;
  valor_total?: number;
  valor_transporte?: number;
  data_pedido?: Date;
  status_entrega?:
    | "PENDENTE"
    | "EM ROTA"
    | "CONCLUÍDA"
    | "ACEITO"
    | "ENVIADO"
    | "ENTREGUE";
  assinado_por?: string | null;
  hora_inicio?: Date | null;
  hora_prevista?: Date | null;
};

export function clipboardCopy(text: string) {
  navigator.clipboard.writeText(text);
  toast.success("Texto copiado para a área de transferência!", {
    theme: document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  });
}

export async function handleDelete(id: number) {
  try {
    await DeleteDelivery({ id });
    toast.dismiss();
    toast.success("Entrega deletada com sucesso!", {
      theme: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
    });
  } catch (e) {
    console.error(e);
    toast.error("Erro ao deletar entrega", {
      theme: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
    });
  }
}

export const columns: ColumnDef<Entrega>[] = [
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => <div>{row.getValue("descricao")}</div>,
  },
  {
    accessorKey: "status_entrega",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status_entrega") as
        | "PENDENTE"
        | "EM ROTA"
        | "CONCLUÍDA"; // Cast para o tipo correto
      let statusColor = "gray"; // Default color

      // Definindo a cor do badge com base no status
      if (status === "PENDENTE") {
        statusColor = "yellow";
      } else if (status === "EM ROTA") {
        statusColor = "blue";
      } else if (status === "CONCLUÍDA") {
        statusColor = "green";
      }

      return (
        <Badge variant="outline" color={statusColor} className="capitalize">
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "data_pedido",
    header: "Data do Pedido",
    cell: ({ row }) => (
      <div>{new Date(row.getValue("data_pedido")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "valor_total",
    header: "Valor Total",
    cell: ({ row }) => {
      const valorTotal = parseFloat(row.getValue("valor_total"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(valorTotal);

      return <div className="font-semibold">{formatted}</div>;
    },
  },
  {
    accessorKey: "distancia_km",
    header: "Distância",
    cell: ({ row }) => <div>{row.getValue("distancia_km")} km</div>,
  },
  {
    accessorKey: "tempo_minutos",
    header: "Tempo de Transporte",
    cell: ({ row }) => {
      const tempoTransporte = row.getValue("tempo_minutos") as number; // Supondo que o tempo de transporte seja um número
      const tempoFormatado = UseConvertMinutesToHours(tempoTransporte); // Usando o hook para formatar o tempo

      return <div>{tempoFormatado}</div>;
    },
  },
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => {
      const entrega = row.original;
      return (
        <div className="flex justify-center">
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => clipboardCopy(entrega.id.toString())}
                >
                  Copiar ID da Entrega
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DialogTrigger asChild onClick={() => {}}>
                  <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                </DialogTrigger>
                {entrega.status_entrega === "PENDENTE" && (
                  <DropdownMenuItem
                    onClick={() =>
                      toast(
                        <ConfirmationToast
                          onConfirm={() => handleDelete(entrega.id)}
                          onCancel={() => toast.dismiss()}
                          message={`Tem certeza que deseja excluir a entrega ${entrega.id}? Esta operação é irreversível.`}
                        />,
                        {
                          autoClose: false, // Desabilita o fechamento automático
                          closeButton: false, // Remove o botão de fechar padrão
                          theme: document.documentElement.classList.contains(
                            "dark"
                          )
                            ? "dark"
                            : "light",
                          closeOnClick: false, // Impede que o toast feche ao clicar fora
                        }
                      )
                    }
                    className="text-red-600"
                  >
                    Excluir
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <EntregaDetails entrega={entrega} />
          </Dialog>
        </div>
      );
    },
  },
];

export function DataTableDemo({ data }: { data: Entrega[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full dark:bg-gray-900 dark:text-white p-6">
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Filtrar por descrição..."
          value={
            (table.getColumn("descricao")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("descricao")?.setFilterValue(event.target.value)
          }
          className="max-w-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="ml-auto dark:border-gray-600 dark:text-white"
            >
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize dark:bg-gray-800 dark:text-white"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-lg border dark:border-gray-600 overflow-hidden shadow-lg">
        <Table>
          <TableHeader className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="px-6 py-3 text-left text-sm font-semibold tracking-wider"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none flex items-center space-x-1"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: (
                              <ArrowUpNarrowWide className="ml-2 h-4 w-4 text-gray-500 dark:text-gray-300" />
                            ),
                            desc: (
                              <ArrowDownNarrowWide className="ml-2 h-4 w-4 text-gray-500 dark:text-gray-300" />
                            ),
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-white dark:bg-gray-900">
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-3 px-6 text-sm font-medium text-gray-800 dark:text-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => {
                  if (table.getCanPreviousPage()) {
                    table.previousPage();
                  }
                }}
                className={
                  !table.getCanPreviousPage()
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
            {Array.from({ length: table.getPageCount() }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => table.setPageIndex(index)}
                  isActive={table.getState().pagination.pageIndex === index}
                  className="cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  if (table.getCanNextPage()) {
                    table.nextPage();
                  }
                }}
                className={
                  !table.getCanNextPage()
                    ? "cursor-not-allowed opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export default function DeleteToast({
  closeToast,
  toastProps,
  data,
}: ToastContentProps<{ message: string; onConfirm: () => void }>) {
  const strokeDash = 565.48;
  const attributes: HTMLAttributes<SVGCircleElement> = {};

  // Handle controlled progress bar
  if (typeof toastProps.progress === "number") {
    attributes.style = {
      transition: "all .1s linear",
      strokeDashoffset: `${strokeDash - strokeDash * toastProps.progress}px`,
    };
  }

  const handleConfirm = () => {
    data.onConfirm(); // Executa a função de confirmação
    closeToast(); // Fecha o toast
  };

  const handleCancel = () => {
    closeToast(); // Fecha o toast sem fazer nada
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Mensagem de confirmação */}
      <p className="text-sm">{data.message}</p>

      {/* Botões de ação */}
      <div className="flex gap-2 justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCancel}
          className="dark:bg-gray-800 dark:text-white"
        >
          Cancelar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleConfirm}
          className="dark:bg-red-600 dark:text-white"
        >
          Confirmar
        </Button>
      </div>

      {/* Barra de progresso (opcional) */}
      <svg
        width="40"
        height="40"
        viewBox="-25 -25 250 250"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="-rotate-90"
      >
        <circle
          r="90"
          cx="100"
          cy="100"
          fill="transparent"
          stroke="#e0e0e0"
          strokeWidth="6"
          strokeDasharray={`${strokeDash}px`}
          strokeDashoffset="0"
        />
        <circle
          r="90"
          cx="100"
          cy="100"
          stroke="#76e5b1"
          strokeWidth="16px"
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={`${strokeDash}px`}
          {...attributes}
        />
      </svg>
    </div>
  );
}
