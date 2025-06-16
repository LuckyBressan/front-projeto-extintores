import type { EnumClientType } from "./EnumClient";

export interface Client {
    "codigo": number;
    "nome"  : string;
    "dataNascimento": string;
    "email": string;
    "tipo": EnumClientType;
    "cpf": string;
    "cnpj": string;
}

export interface ClientContextType {
    clients: Client[];
    loadClients: () => Promise<void|Client[]>;
    addClient  : (data: Client) => void;
    updateClient: (id: number, data: Client) => void;
    deleteClient: (id: number) => void;
}