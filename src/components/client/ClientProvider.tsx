import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";


import api from "@/services/api";
import { useAlert } from "../AlertProvider";
import { AlertEnum } from "@/enums/AlertEnum";
import type { AxiosResponse } from "axios";
import type { UpdateStateAction } from "@/@types/State";
import type { Client, ClientContextType } from "@/@types/Client";

const ClientContext = createContext<ClientContextType | undefined>(
  undefined
);

export function useClientContext() {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error(
      "useClientContext deve ser usado dentro do ClientProvider"
    );
  }
  return context;
}

export function ClientProvider({ children }: { children: ReactNode }) {

  const [clients, setClients] = useState<Client[]>([]);

  const { showAlert } = useAlert();

  const updateClientState = (data: Client, action?: UpdateStateAction) => {
    setClients(prevClient => {

        //Se for ação de alterar, alteramos uma das clientes salvas no state
        if(action?.alterar) {
          return prevClient.map(value => value.codigo == data.codigo ? data : value)
        }

        //Se for ação de excluir, filtramos as clientes para não conter o que foi apagado
        if(action?.excluir) {
          console.log(prevClient.filter(value => value.codigo !== data.codigo))
          return prevClient.filter(value => value.codigo !== data.codigo)
        }
        return [...prevClient, data]
      })
  }

  const loadClients = () => {
    return api
      .get("Cliente")
      .then((res: AxiosResponse<Client[], any>) => {
        setClients(res.data)
        return res.data;
      })
      .catch((err) => {
        console.error("Erro ao carregar clientes:", err);
      });
  };

  const updateClient = (codigo: number, data: Client) => {
    if (!codigo || !data || codigo !== data.codigo) {
      return showAlert(
        {
          title: "Erro ao atualizar cliente!",
          description:
            "Não foi possível atualizar a cliente por iconsistência de dados.",
        },
        AlertEnum.ERROR
      );
    }
    api
      .put(`Cliente/${codigo}`, data)
      .then(() => {
        updateClientState(data, { alterar: true });
        showAlert(
          {
            title: "Cliente atualizada com sucesso!",
          },
          AlertEnum.SUCCESS
        );
      })
      .catch((err) => {
        showAlert(
          {
            title: "Erro ao atualizar cliente!",
            description: "Verifique o console.",
          },
          AlertEnum.ERROR
        );
        console.error("Erro ao atualizar clientes:", err);
      });
  };

  const addClient = (data: Client) => {
    if (!data) {
      return showAlert(
        {
          title: "Erro ao adicionar cliente!",
          description:
            "Não foi possível adicionar a cliente por iconsistência de dados.",
        },
        AlertEnum.ERROR
      );
    }
    api
      .post("Cliente", data)
      .then(() => {
        updateClientState(data);
        showAlert(
          {
            title: "Cliente inserida com sucesso!",
          },
          AlertEnum.SUCCESS
        );
      })
      .catch((err) => {
        showAlert(
          {
            title: "Erro ao inserir cliente!",
            description: "Verifique o console.",
          },
          AlertEnum.ERROR
        );
        console.error("Erro ao inserir clientes:", err);
      });
  };

  const deleteClient = (codigo: number) => {
    if (!codigo) {
      return showAlert(
        {
          title: "Erro ao deletar cliente!",
          description:
            "Não foi possível deletar a cliente por iconsistência de dados.",
        },
        AlertEnum.ERROR
      );
    }
    api
      .delete(`Cliente/${codigo}`)
      .then(() => {
        updateClientState({ codigo, cnpj: '', cpf: '', dataNascimento: '', email: '', nome: '', tipo: 0 }, { excluir: true });
        showAlert(
          {
            title: "Cliente deletada com sucesso!",
          },
          AlertEnum.SUCCESS
        );
      })
      .catch((err) => {
        showAlert(
          {
            title: "Erro ao deletar cliente!",
            description: "Verifique o console.",
          },
          AlertEnum.ERROR
        );
        console.error("Erro ao deletar cliente:", err);
      });
  };

  // Carrega ao montar
  useEffect(() => {
    loadClients()
  }, []);

  return (
    <ClientContext.Provider
      value={{
        clients,
        loadClients,
        addClient,
        updateClient,
        deleteClient
      }}>
      {children}
    </ClientContext.Provider>
  );
}
