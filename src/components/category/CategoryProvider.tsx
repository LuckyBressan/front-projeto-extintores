import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type { Category, CategoryContextType, CategoryWithTotalProducts } from "@/@types/Category";
import api from "@/services/api";
import { useAlert } from "../AlertProvider";
import { AlertEnum } from "@/enums/AlertEnum";
import type { AxiosResponse } from "axios";
import type { UpdateStateAction } from "@/@types/State";

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export function useCategoryContext() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error(
      "useCategoryContext deve ser usado dentro do CategoryProvider"
    );
  }
  return context;
}

export function CategoryProvider({ children }: { children: ReactNode }) {

  const [categorys, setCategorys] = useState<Category[]>([]);
  const [categorysWithMostProducts, setCategorysWithMostProducts] = useState<CategoryWithTotalProducts[]>([])
  const [categoryWithLeastProducts, setCategoryWithLeastProducts] = useState<CategoryWithTotalProducts>({})

  const { showAlert } = useAlert();

  const updateCategoryState = (data: Category, action?: UpdateStateAction) => {
    setCategorys(prevCategory => {

        //Se for ação de alterar, alteramos uma das categorias salvas no state
        if(action?.alterar) {
          return prevCategory.map(value => value.codigo == data.codigo ? data : value)
        }

        //Se for ação de excluir, filtramos as categorias para não conter o que foi apagado
        if(action?.excluir) {
          console.log(prevCategory.filter(value => value.codigo !== data.codigo))
          return prevCategory.filter(value => value.codigo !== data.codigo)
        }
        return [...prevCategory, data]
      })
  }

  const loadCategory = () => {
    api
      .get("Categoria")
      .then((res) => setCategorys(res.data))
      .catch((err) => {
        console.error("Erro ao carregar categorias:", err);
      });
  };

  const updateCategory = (codigo: number, data: Category) => {
    if (!codigo || !data || codigo !== data.codigo) {
      return showAlert(
        {
          title: "Erro ao atualizar categoria!",
          description:
            "Não foi possível atualizar a categoria por iconsistência de dados.",
        },
        AlertEnum.ERROR
      );
    }
    api
      .put(`Categoria/${codigo}`, data)
      .then(() => {
        updateCategoryState(data, { alterar: true });
        showAlert(
          {
            title: "Categoria atualizada com sucesso!",
          },
          AlertEnum.SUCCESS
        );
      })
      .catch((err) => {
        showAlert(
          {
            title: "Erro ao atualizar categoria!",
            description: "Verifique o console.",
          },
          AlertEnum.ERROR
        );
        console.error("Erro ao atualizar categorias:", err);
      });
  };

  const addCategory = (data: Category) => {
    if (!data) {
      return showAlert(
        {
          title: "Erro ao adicionar categoria!",
          description:
            "Não foi possível adicionar a categoria por iconsistência de dados.",
        },
        AlertEnum.ERROR
      );
    }
    api
      .post("Categoria", data)
      .then(() => {
        updateCategoryState(data);
        showAlert(
          {
            title: "Categoria inserida com sucesso!",
          },
          AlertEnum.SUCCESS
        );
      })
      .catch((err) => {
        showAlert(
          {
            title: "Erro ao inserir categoria!",
            description: "Verifique o console.",
          },
          AlertEnum.ERROR
        );
        console.error("Erro ao inserir categorias:", err);
      });
  };

  const deleteCategory = (codigo: number) => {
    if (!codigo) {
      return showAlert(
        {
          title: "Erro ao deletar categoria!",
          description:
            "Não foi possível deletar a categoria por iconsistência de dados.",
        },
        AlertEnum.ERROR
      );
    }
    api
      .delete(`Categoria/${codigo}`)
      .then(() => {
        updateCategoryState({ codigo, descricao: '', nome: '' }, { excluir: true });
        showAlert(
          {
            title: "Categoria deletada com sucesso!",
          },
          AlertEnum.SUCCESS
        );
      })
      .catch((err) => {
        showAlert(
          {
            title: "Erro ao deletar categoria!",
            description: "Verifique o console.",
          },
          AlertEnum.ERROR
        );
        console.error("Erro ao deletar categoria:", err);
      });
  };

  const loadCategorysWithMostProducts = () => {
    api.get('Categoria/categoriasMaisProdutos')
      .then((res: AxiosResponse<CategoryWithTotalProducts[]>) => setCategorysWithMostProducts(res.data))
      .catch(error => {
        console.log('Erro ao procurar categoria com mais produtos:', error);
      })
  }

  const loadCategoryWithLeastProducts = () => {
    api.get('Categoria/categoriaMenosProdutos')
      .then((res: AxiosResponse<CategoryWithTotalProducts>) => setCategoryWithLeastProducts(res.data))
      .catch(error => {
        console.log('Erro ao procurar categoria com mais produtos:', error);
      })
  }

  // Carrega ao montar
  useEffect(() => {
    loadCategory()
    loadCategorysWithMostProducts()
    loadCategoryWithLeastProducts()
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categorys,
        addCategory,
        updateCategory,
        deleteCategory,
        categorysWithMostProducts,
        categoryWithLeastProducts
      }}>
      {children}
    </CategoryContext.Provider>
  );
}
