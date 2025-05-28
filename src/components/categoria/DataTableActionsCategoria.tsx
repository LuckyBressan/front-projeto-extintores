
import { DropdownMenuItem } from "../ui/dropdown-menu";

import { useCategoriaContext } from "./CategoriaProvider";

import DialogForm from "../DialogForm";
import DialogCategoria from "./DialogCategoria";

import type { Categoria } from "@/@types/Categoria";

export default function DataTableActionsCategoria({
    dados
} : {
    dados: Categoria
}) {
    const { deleteCategory } = useCategoriaContext();

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
                action: () => deleteCategory(dados.codigo),
              }}
            />
        </>
    )
}