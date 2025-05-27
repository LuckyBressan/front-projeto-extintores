import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { CirclePlus } from "lucide-react";

import DialogForm from "../DialogForm";
import api from "@/services/api";

import type { Categoria } from "@/@types/Categoria";

import { useCategoriaContext } from "./CategoriaProvider";
import { useAlert } from "../AlertProvider";
import { AlertEnum } from "@/enums/AlertEnum";

export default function DialogCategoria({
  alterar,
}: {
  alterar?: {
    trigger: React.ReactNode;
    dados: Categoria;
  };
}) {

  const { showAlert } = useAlert();
  const { carregaCategorias } = useCategoriaContext();

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
          const endpoint = alterar ? `/${categoria.codigo}` : ''
          api[alterar ? "put" : "post"](`Categoria${endpoint}`, categoria)
            .then(() => {
              carregaCategorias(); // Recarrega os estados após a exclusão
              showAlert(
                {
                  title: 'Sucesso!',
                  description: `Categoria foi ${alterar ? 'alterada' : 'incluida'} com sucesso.`,
                },
                AlertEnum.SUCCESS
              );
            })
            .catch((error) => {
              const acao = alterar ? 'alterar' : 'incluir'
              showAlert(
                {
                  title: "Falha!",
                  description:
                    `Não foi possível ${acao} a categoria, verifique o console.`,
                },
                AlertEnum.ERROR
              );
              console.error(`Erro ao ${acao} a categoria:`, error);
            });
          carregaCategorias();
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
