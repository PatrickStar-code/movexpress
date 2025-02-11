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

const data: Entrega[] = [
  {
    id: 1,
    descricao: "Entrega de móveis",
    peso: 25.5,
    cep_origem: "12345-678",
    numero_origem: 100,
    bairro_origem: "Centro",
    logradouro_origem: "Rua A",
    cep_destino: "87654-321",
    numero_destino: 200,
    bairro_destino: "Bairro B",
    logradouro_destino: "Rua B",
    distancia_km: "15",
    tempo_transporte: "30 minutos",
    tempo_minutos: 30,
    valor_total: 100.5,
    valor_70p: 70.35,
    data_pedido: new Date(),
    status_entrega: "PENDENTE",
    assinado_por: "João Silva",
    hora_inicio: new Date(),
    hora_prevista: new Date(),
  },
  // outros dados de entrega...
];

export type Entrega = {
  id: number;
  descricao: string;
  peso: number;
  cep_origem: string;
  numero_origem: number;
  bairro_origem: string;
  logradouro_origem: string;
  cep_destino: string;
  numero_destino: number;
  bairro_destino: string;
  logradouro_destino: string;
  distancia_km: string;
  tempo_transporte: string;
  tempo_minutos: number;
  valor_total: number;
  valor_70p: number;
  data_pedido: Date;
  status_entrega: "PENDENTE" | "EM ROTA" | "CONCLUÍDA";
  assinado_por: string | null;
  hora_inicio: Date | null;
  hora_prevista: Date | null;
};

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
    accessorKey: "tempo_transporte",
    header: "Tempo de Transporte",
    cell: ({ row }) => <div>{row.getValue("tempo_transporte")}</div>,
  },
  {
    id: "acoes",
    header: "Ações",
    cell: ({ row }) => {
      const entrega = row.original;
      return (
        <div className="flex justify-center">
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
                onClick={() =>
                  navigator.clipboard.writeText(entrega.id.toString())
                }
              >
                Copiar ID da Entrega
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function DataTableDemo() {
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
