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

import { useCategoryContext } from "./CategoryProvider";

import type { Category } from "@/@types/Category";

import DataTable from "../DataTable";
import DialogCategory from "./DialogCategory";
import DataTableActionsCategory from "./DataTableActionsCategory";

const columns: ColumnDef<Category>[] = [
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
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nome
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "descricao",
    header: "Descrição",
    cell: ({ row }) => <div>{row.getValue("descricao")}</div>,
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
            <DataTableActionsCategory dados={categoria} />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function DataTableCategory() {
  const { categorys } = useCategoryContext();

  return (
    <>
      <DataTable
        columns={columns}
        data={categorys}
        filters={[
          <Input
            name="nome"
            placeholder="Filtrar por nome..."
            className="max-w-sm"
          />,
        ]}
        actions={[<DialogCategory />]}
        visibilityColumnsControl={false}
      />
    </>
  );
}
