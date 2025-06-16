import { DropdownMenuItem } from "../ui/dropdown-menu";

import { useClientContext } from "./ClientProvider";

import DialogForm from "../DialogForm";

import type { Client } from "@/@types/Client";
import DialogClient from "./DialogClient";

export default function DataTableActionsClient({
  dados,
}: {
  dados: Client;
}) {
  const { deleteClient } = useClientContext();

  return (
    <>
      <DialogClient
        alterar={{
          dados,
          trigger: (
            <DropdownMenuItem key="acao-alterar">Alterar</DropdownMenuItem>
          ),
        }}
      />
      <DialogForm
        dialog={{
          title: "Excluir Cliente",
          description: "Você tem certeza que deseja excluir o registro?",
        }}
        trigger={{
          obj: <DropdownMenuItem key="acao-excluir">Excluir</DropdownMenuItem>,
        }}
        submit={{
          title: "Excluir",
          action: () => deleteClient(dados.codigo),
        }}
      />
    </>
  );
}
