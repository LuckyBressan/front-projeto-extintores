export interface Category {
  codigo: number;
  nome  : string;
  descricao: string;
};

export interface CategoryContextType {
  categorys   : Category[];
  loadCategory: () => void;
  addCategory : (data: Category) => void;
  updateCategory: (codigo: number, data: Category) => void;
  deleteCategory: (codigo: number) => void;
  categorysWithMostProducts: CategoryWithTotalProducts[];
  categoryWithLeastProducts: CategoryWithTotalProducts;
};

export type CategoryUpdateStateAction = {
  alterar?: boolean;
  excluir?: boolean;
}

export interface CategoryWithTotalProducts extends Category {
  descricao    : undefined;
  totalProdutos: number;
}