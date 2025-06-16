import type { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";

import { useClientContext } from "./ClientProvider";

import DataTable from "../DataTable";
import DialogClient from "./DialogClient";
import DataTableActionsClient from "./DataTableActionsClient";
import type { Client } from "@/@types/Client";
import { EnumClientType } from "@/@types/EnumClient";

const columns: ColumnDef<Client>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "codigo",
    header: "Código",
    cell: ({ row }) => <div>{row.getValue("codigo")}</div>,
  },
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          Nome
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "email",
    header: "E-mail",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "tipo",
    header: "Tipo de Cliente",
    cell: ({ row }) => <div>{row.getValue("tipo") == EnumClientType.FISICA ? 'Física' : 'Jurídica'}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const categoria = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DataTableActionsClient dados={categoria} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTableClient() {
  const { clients } = useClientContext();

  return (
    <>
      <DataTable
        columns={columns}
        data={clients}
        filters={[
          <Input
            name="nome"
            placeholder="Filtrar por nome..."
            className="max-w-sm"
          />,
        ]}
        actions={[<DialogClient />]}
        visibilityColumnsControl={false}
      />
    </>
  );
}
