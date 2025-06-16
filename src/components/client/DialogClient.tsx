import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

import { CirclePlus } from "lucide-react";

import DialogForm from "../DialogForm";

import type { Client } from "@/@types/Client";

import { useClientContext } from "./ClientProvider";
import { EnumClientType } from "@/@types/EnumClient";

export default function DialogClient({
  alterar,
}: {
  alterar?: {
    trigger: React.ReactNode;
    dados: Client;
  };
}) {
  const { addClient, updateClient } = useClientContext();

  const title = alterar ? "Alterar" : "Incluir";

  const handleSubmit = (client: Client, alterar: boolean) => {

    client = {
      ...client,
      tipo: parseInt(client.tipo)
    }
    if(alterar) {
      updateClient(client.codigo, client)
      return;
    }
    addClient(client);
  }

  return (
    <DialogForm
      trigger={{
        obj: alterar?.trigger,
        info: {
          icon: <CirclePlus />,
          title: `${title} Cliente`,
        },
      }}
      dialog={{
        title: `${title} Cliente`,
        description: "Informe os dados...",
      }}
      submit={{
        title: alterar ? "Alterar" : "Salvar",
        action: async (data) => {
          handleSubmit(data as Client, !!alterar)
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
              name="codigo"
              type="number"
              maxLength={2}
              required
              disabled={alterar ? true : false}
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
              name="nome"
              required
              defaultValue={alterar?.dados.nome}
              className="col-span-3"
            />
          ),
        },
        {
          label: (
            <Label htmlFor="email" className="text-right">
              E-mail
            </Label>
          ),
          input: (
            <Input
              id="email"
              name="email"
              type="email"
              required
              defaultValue={alterar?.dados.email}
              className="col-span-3"
            />
          ),
        },
        {
          label: (
            <Label htmlFor="dataNascimento" className="text-right">
              Data de Nascimento
            </Label>
          ),
          input: (
            <Input
              id="dataNascimento"
              name="dataNascimento"
              type="date"
              required
              defaultValue={alterar?.dados.dataNascimento}
              className="col-span-3"
            />
          ),
        },
        {
          label: (
            <Label htmlFor="tipo" className="text-right">
              Tipo de Cliente
            </Label>
          ),
          input: (
            <Select name="tipo" defaultValue={alterar?.dados.tipo?.toString() ?? EnumClientType.FISICA.toString()} required className="col-span-3">
              <SelectTrigger>
                <SelectValue placeholder="Selecione um tipo" className="capitalize" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    Object.keys(EnumClientType).map(( value ) => {
                      if(!isNaN(parseInt(value))) return;
                      return (
                        <SelectItem
                          key={`tipo-${value}`}
                          value={EnumClientType[value].toString()}
                          className="capitalize"
                        >
                          {value}
                        </SelectItem>
                      )
                    })
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          ),
        },
        {
          label: (
            <Label htmlFor='cpf' className="text-right uppercase">
              CPF
            </Label>
          ),
          input: (
            <Input
              id='cpf'
              name='cpf'
              required
              defaultValue={alterar?.dados.cpf ?? alterar?.dados.cnpj}
              className="col-span-3"
            />
          ),
        },
      ]}
    />
  );
}
