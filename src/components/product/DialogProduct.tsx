import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { CirclePlus } from "lucide-react";

import DialogForm from "../DialogForm";

import type { Product } from "@/@types/Product";
import { useProductContext } from "./ProductProvider";

export default function DialogProduct({
  alterar,
}: {
  alterar?: {
    trigger: React.ReactNode;
    dados: Product;
  };
}) {
  const { addProduct, updateProduct } = useProductContext();

  const title = alterar ? "Alterar" : "Incluir";

  function handleKeyUp(

  ) {
    // if (!isNaN(Number(e.key))) {
    //   e.target.value = e.target.value.replace(/\d/g, "");
    // }
  }

  const handleSubmit = (product: Product, alterar: boolean) => {

    if(alterar) {
      updateProduct(product.codigo, product)
      return;
    }
    addProduct(product);
  }

  return (
    <DialogForm
      trigger={{
        obj: alterar?.trigger,
        info: {
          icon: <CirclePlus />,
          title: `${title} Produto`,
        },
      }}
      dialog={{
        title: `${title} Produto`,
        description: "Informe os dados...",
      }}
      submit={{
        title: alterar ? "Alterar" : "Salvar",
        action: async (data) => {
          handleSubmit(data as Product, !!alterar)
        },
      }}
      form={[
        {
          label: (
            <Label htmlFor="codigo" className="text-right">
              Código
            </Label>
          ),
          input: (
            <Input
              id="codigo"
              type="number"
              maxLength={2}
              required
              disabled={alterar ? true : false}
              defaultValue={alterar?.dados.codigo}
            />
          ),
        },
        {
          label: (
            <Label htmlFor="nome" className="text-right">
              Nome
            </Label>
          ),
          input: (
            <Input
              id="nome"
              required
              defaultValue={alterar?.dados.nome}
              className="col-span-3"
              onKeyUp={handleKeyUp}
            />
          ),
        },
        {
          label: (
            <Label htmlFor="descricao" className="text-right">
              Descrição
            </Label>
          ),
          input: (
            <Textarea
              id="descricao"
              required
              defaultValue={alterar?.dados.descricao}
              className="col-span-3"
              onKeyUp={handleKeyUp}
            />
          ),
        },
      ]}
    />
  );
}
