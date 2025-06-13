import { DropdownMenuItem } from "../ui/dropdown-menu";

import { useProductContext } from "./ProductProvider";
import type { Product } from "@/@types/Product";

import DialogForm from "../DialogForm";
import DialogProduct from "./DialogProduct";


export default function DataTableActionsProduct({
  dados,
}: {
  dados: Product;
}) {
  const { deleteProduct } = useProductContext();

  return (
    <>
      <DialogProduct
        alterar={{
          dados,
          trigger: (
            <DropdownMenuItem key="acao-alterar">Alterar</DropdownMenuItem>
          ),
        }}
      />
      <DialogForm
        dialog={{
          title: "Excluir Produto",
          description: "Você tem certeza que deseja excluir o registro?",
        }}
        trigger={{
          obj: <DropdownMenuItem key="acao-excluir">Excluir</DropdownMenuItem>,
        }}
        submit={{
          title: "Excluir",
          action: () => deleteProduct(dados.codigo),
        }}
      />
    </>
  );
}
