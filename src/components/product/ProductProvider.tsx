import type { Product, ProductContextType } from "@/@types/Product";
import api from "@/services/api";
import type { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useAlert } from "../AlertProvider";
import { AlertEnum } from "@/enums/AlertEnum";
import type { UpdateStateAction } from "@/@types/State";

const ProductContext = createContext<ProductContextType|undefined>(undefined)

export function useProductContext() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "useProductContext deve ser usado dentro do ProductProvider"
    );
  }
  return context;
}

export default function ProductProvider({ children }: { children: ReactNode }) {

    const [products, setProducts] = useState<Product[]>([])

    const { showAlert } = useAlert();

    const loadProducts = () => {
        api.get('Produto')
            .then((res: AxiosResponse<Product[]>) => setProducts(res.data))
            .catch(error => console.log('Erro ao carregar os produtos: ', error))
    }

    const updateProductState = (data: Product, action?: UpdateStateAction) => {
        setProducts(prevProduct => {

            //Se for ação de alterar, alteramos uma das categorias salvas no state
            if(action?.alterar) {
                return prevProduct.map(value => value.codigo == data.codigo ? data : value)
            }

            //Se for ação de excluir, filtramos as categorias para não conter o que foi apagado
            if(action?.excluir) {
                console.log(prevProduct.filter(value => value.codigo !== data.codigo))
                return prevProduct.filter(value => value.codigo !== data.codigo)
            }
            return [...prevProduct, data]
        })
    }

    const addProduct = (data: Product) => {
        if (!data) {
        return showAlert(
            {
            title: "Erro ao adicionar produto!",
            description:
                "Não foi possível adicionar o produto por iconsistência de dados.",
            },
            AlertEnum.ERROR
        );
        }
        api
        .post("Produto", data)
        .then(() => {
            updateProductState(data);
            showAlert(
            {
                title: "Produto inserido com sucesso!",
            },
            AlertEnum.SUCCESS
            );
        })
        .catch((err) => {
            showAlert(
            {
                title: "Erro ao inserir produto!",
                description: "Verifique o console.",
            },
            AlertEnum.ERROR
            );
            console.error("Erro ao inserir produtos:", err);
        });
    };

    const updateProduct = (codigo: number, data: Product) => {
        if (!codigo || !data || codigo !== data.codigo) {
        return showAlert(
            {
            title: "Erro ao atualizar produto!",
            description:
                "Não foi possível atualizar o produto por iconsistência de dados.",
            },
            AlertEnum.ERROR
        );
        }
        api
        .put(`Produto/${codigo}`, data)
        .then(() => {
            updateProductState(data, { alterar: true });
            showAlert(
            {
                title: "Produto atualizado com sucesso!",
            },
            AlertEnum.SUCCESS
            );
        })
        .catch((err) => {
            showAlert(
            {
                title: "Erro ao atualizar produto!",
                description: "Verifique o console.",
            },
            AlertEnum.ERROR
            );
            console.error("Erro ao atualizar produtos:", err);
        });
    };

    const deleteProduct = (codigo: number) => {
        if (!codigo) {
        return showAlert(
            {
            title: "Erro ao deletar produto!",
            description:
                "Não foi possível deletar o produto por iconsistência de dados.",
            },
            AlertEnum.ERROR
        );
        }
        api
        .delete(`Produto/${codigo}`)
        .then(() => {
            updateProductState({ codigo, descricao: '', nome: '' }, { excluir: true });
            showAlert(
            {
                title: "Produto deletado com sucesso!",
            },
            AlertEnum.SUCCESS
            );
        })
        .catch((err) => {
            showAlert(
            {
                title: "Erro ao deletar produto!",
                description: "Verifique o console.",
            },
            AlertEnum.ERROR
            );
            console.error("Erro ao deletar produto:", err);
        });
    };

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <ProductContext.Provider
            value={{
                products,
                addProduct,
                updateProduct,
                deleteProduct
            }}
        >
            { children }
        </ProductContext.Provider>
    )
}