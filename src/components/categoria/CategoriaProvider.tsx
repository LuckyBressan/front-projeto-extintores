import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

import type { Categoria } from "@/@types/Categoria";
import api from "@/services/api";

type CategoriaContextType = {
  categorias: Categoria[];
  carregaCategorias: () => void;
};

const CategoriaContext = createContext<CategoriaContextType | undefined>(undefined);

export function useCategoriaContext() {
  const context = useContext(CategoriaContext);
  if (!context) {
    throw new Error("useCategoriaContext deve ser usado dentro do CategoriaProvider");
  }
  return context;
}

export function CategoriaProvider({ children }: { children: ReactNode }) {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const carregaCategorias = () => {
    api.get("Categoria")
      .then((res) => setCategorias(res.data))
      .catch((err) => {
        console.error("Erro ao carregar categorias:", err);
      });
  };

  // Carrega ao montar
  useEffect(() => {
    carregaCategorias();
  }, []);

  return (
    <CategoriaContext.Provider value={{ categorias, carregaCategorias }}>
      {children}
    </CategoriaContext.Provider>
  );
}
