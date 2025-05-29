import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

import type { Categoria } from "@/@types/Categoria";
import api from "@/services/api";
import { useAlert } from "../AlertProvider";
import { AlertEnum } from "@/enums/AlertEnum";

type CategoriaContextType = {
  categorias       : Categoria[];
  carregaCategorias: () => void;
  addCategory      : (data: Categoria) => void;
  updateCategory   : (codigo: number, data: Categoria) => void;
  deleteCategory   : (codigo: number) => void;
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
  const { showAlert } = useAlert();

  const carregaCategorias = () => {
    api.get("Categoria")
      .then((res) => setCategorias(res.data))
      .catch((err) => {
        console.error("Erro ao carregar categorias:", err);
      });
  };

  const updateCategory = (codigo: number, data: Categoria) => {
    if(
      !codigo || !data || codigo !== data.codigo 
    ) {
      return showAlert({
        title: 'Erro ao atualizar categoria!',
        description: 'Não foi possível atualizar a categoria por iconsistência de dados.'
      }, AlertEnum.ERROR)  
    }
   api.put(`Categoria/${codigo}`)
      .then(() => {
        carregaCategorias()
        showAlert({
          title: 'Categoria atualizada com sucesso!'
        }, AlertEnum.SUCCESS)
      })
      .catch((err) => {
        showAlert({
          title: 'Erro ao atualizar categoria!',
          description: 'Verifique o console.'
        }, AlertEnum.ERROR) 
        console.error("Erro ao atualizar categorias:", err);
      });
  };

  const addCategory = (data: Categoria) => {
    if(!data) {
      return showAlert({
        title: 'Erro ao adicionar categoria!',
        description: 'Não foi possível adicionar a categoria por iconsistência de dados.'
      }, AlertEnum.ERROR)  
    }
   api.post('Categoria')
      .then(() => {
        carregaCategorias()
        showAlert({
          title: 'Categoria inserida com sucesso!'
        }, AlertEnum.SUCCESS)
      })
      .catch((err) => {
        showAlert({
          title: 'Erro ao inserir categoria!',
          description: 'Verifique o console.'
        }, AlertEnum.ERROR) 
        console.error("Erro ao inserir categorias:", err);
      });
  };

  const deleteCategory = (codigo: number) => {
    if(!codigo) {
      return showAlert({
        title: 'Erro ao deletar categoria!',
        description: 'Não foi possível deletar a categoria por iconsistência de dados.'
      }, AlertEnum.ERROR)  
    }
   api.delete('Categoria')
      .then(() => {
        carregaCategorias()
        showAlert({
          title: 'Categoria deletada com sucesso!'
        }, AlertEnum.SUCCESS)
      })
      .catch((err) => {
        showAlert({
          title: 'Erro ao deletar categoria!',
          description: 'Verifique o console.'
        }, AlertEnum.ERROR) 
        console.error("Erro ao deletar categoria:", err);
      });
  };

  // Carrega ao montar
  useEffect(() => {
    carregaCategorias();
  }, []);

  return (
    <CategoriaContext.Provider value={{ categorias, carregaCategorias, addCategory, updateCategory, deleteCategory }}>
      {children}
    </CategoriaContext.Provider>
  );
}
