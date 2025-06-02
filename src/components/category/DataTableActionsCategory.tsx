import { DropdownMenuItem } from "../ui/dropdown-menu";

import { useCategoryContext } from "./CategoryProvider";

import DialogForm from "../DialogForm";
import DialogCategory from "./DialogCategory";

import type { Category } from "@/@types/Category";

export default function DataTableActionsCategory({
  dados,
}: {
  dados: Category;
}) {
  const { deleteCategory } = useCategoryContext();

  return (
    <>
      <DialogCategory
        alterar={{
          dados,
          trigger: (
            <DropdownMenuItem key="acao-alterar">Alterar</DropdownMenuItem>
          ),
        }}
      />
      <DialogForm
        dialog={{
          title: "Excluir Categoria",
          description: "Você tem certeza que deseja excluir o registro?",
        }}
        trigger={{
          obj: <DropdownMenuItem key="acao-excluir">Excluir</DropdownMenuItem>,
        }}
        submit={{
          title: "Excluir",
          action: () => deleteCategory(dados.codigo),
        }}
      />
    </>
  );
}
