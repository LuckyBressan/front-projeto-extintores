import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { CirclePlus } from "lucide-react";

import DialogForm from "../DialogForm";

import type { Categoria } from "@/@types/Categoria";

import { useCategoriaContext } from "./CategoriaProvider";

export default function DialogCategoria({
  alterar,
}: {
  alterar?: {
    trigger: React.ReactNode;
    dados: Categoria;
  };
}) {

  const { addCategory, updateCategory } = useCategoriaContext();

  const title = alterar ? "Alterar" : "Incluir";


  function handleKeyUp(
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    // if (!isNaN(Number(e.key))) {
    //   e.target.value = e.target.value.replace(/\d/g, "");
    // }
  }

  return (
    <DialogForm
      trigger={{
        obj: alterar?.trigger,
        info: {
          icon: <CirclePlus />,
          title: `${title} Categoria`,
        },
      }}
      dialog={{
        title: `${title} Categoria`,
        description: "Informe os dados...",
      }}
      submit={{
        title: alterar ? "Alterar" : "Salvar",
        action: async (data) => {
          const categoria = data as Categoria;
          alterar ? updateCategory(categoria.codigo, categoria) : addCategory(categoria)
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
              maxLength={2}
              required
              disabled={alterar ? true : false}
              value={alterar?.dados.codigo}
              onKeyUp={handleKeyUp}
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
