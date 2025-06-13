import type { Category } from "./Category";

export interface Product {
    codigo         : number;
    nome           : string;
    descricao      : string;
    preco          : number;
    quantidade     : number;
    categoriaCodigo: number;
    categoria      : Category;
}

export interface ProductContextType {
    products: Product[]
    addProduct : (data: Product) => void;
    updateProduct: (codigo: number, data: Product) => void;
    deleteProduct: (codigo: number) => void;
    highestPricedProduct      ?: Product;
    productWithHighestQuantity?: Product;
    productWithLowestQuantity ?: Product;
}

export type ProductUpdateStateAction = {
  alterar?: boolean;
  excluir?: boolean;
}