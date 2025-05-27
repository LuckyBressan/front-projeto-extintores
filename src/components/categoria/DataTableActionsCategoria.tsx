
import { DropdownMenuItem } from "../ui/dropdown-menu";

import { useCategoriaContext } from "./CategoriaProvider";
import { useAlert } from "../AlertProvider";

import DialogForm from "../DialogForm";
import DialogCategoria from "./DialogCategoria";

import type { Categoria } from "@/@types/Categoria";
import { AlertEnum } from "@/enums/AlertEnum";

import api from "@/services/api";

export default function DataTableActionsCategoria({
    dados
} : {
    dados: Categoria
}) {
    const { carregaCategorias } = useCategoriaContext();
    const { showAlert } = useAlert();

    return (
        <>
            <DialogCategoria
              alterar={{
                dados,
                trigger: <DropdownMenuItem key='acao-alterar'>Alterar</DropdownMenuItem>,
              }}
            />
            <DialogForm
              dialog={{
                title: "Excluir Categoria",
                description: "Você tem certeza que deseja excluir o registro?",
              }}
              trigger={{
                obj: <DropdownMenuItem key='acao-excluir'>Excluir</DropdownMenuItem>,
              }}
              submit={{
                title: "Excluir",
                action: () => {
                  console.log("delete");
                  api
                    .delete(`Categoria/${dados.codigo}`)
                    .then(() => {
                      carregaCategorias(); // Recarrega os estados após a exclusão
                      showAlert(
                        {
                          title: "Exclusão feita!",
                          description: "Categoria foi excluída com sucesso.",
                        },
                        AlertEnum.SUCCESS
                      );
                    })
                    .catch((error) => {
                      showAlert(
                        {
                          title: "Exclusão falhou!",
                          description: "Não foi possível excluir a categoria, verifique o console.",
                        },
                        AlertEnum.ERROR
                      );
                      console.error("Erro ao excluir o estado:", error);
                    });
                },
              }}
            />
        </>
    )
}