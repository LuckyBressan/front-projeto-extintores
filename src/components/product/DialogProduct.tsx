import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { CirclePlus } from "lucide-react";

import DialogForm from "../DialogForm";

import type { Product } from "@/@types/Product";
import { useProductContext } from "./ProductProvider";
import { useCategoryContext } from "../category/CategoryProvider";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Category } from "@/@types/Category";

interface ProductSubmit extends Omit<Product, "categoria"> {
  categoria: string;
}

export default function DialogProduct({
  alterar,
}: {
  alterar?: {
    trigger: React.ReactNode;
    dados: Product;
  };
}) {

  const { loadCategorys } = useCategoryContext();
  const { addProduct, updateProduct } = useProductContext();
  
  const [categorys, setCategorys] = useState<Category[]>([]);

  const title = alterar ? "Alterar" : "Incluir";

  const handleLoadCategory = async () => {
    setCategorys(await loadCategorys() ?? []);
  }

  useEffect(() => {
    handleLoadCategory()
  }, [])

  const handleSubmit = (product: ProductSubmit, alterar: boolean) => {

    if(alterar) {
      updateProduct(product.codigo, {
        ...product,
        categoria: undefined,
        categoriaCodigo: parseInt(product.categoria) // Convertendo para número
      })
      return;
    }
    addProduct({
      ...product,
      categoria: undefined,
      categoriaCodigo: parseInt(product.categoria) // Convertendo para número
    });
  }

  return (
    <DialogForm
      trigger={{
        obj: alterar?.trigger,
        info: {
          icon: <CirclePlus />,
          title: `${title} Produto`,
        },
      }}
      dialog={{
        title: `${title} Produto`,
        description: "Informe os dados...",
      }}
      submit={{
        title: alterar ? "Alterar" : "Salvar",
        action: async (data) => {
          handleSubmit(data as ProductSubmit, !!alterar)
        }
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
              defaultValue={alterar?.dados.codigo}
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
            <Label htmlFor="descricao" className="text-right">
              Descrição
            </Label>
          ),
          input: (
            <Textarea
              id="descricao"
              name="descricao"
              required
              defaultValue={alterar?.dados.descricao}
              className="col-span-3"
            />
          ),
        },
        {
          label: (
            <Label htmlFor="preco" className="text-right">
              Preço
            </Label>
          ),
          input: (
            <Input
              id="preco"
              name="preco"
              type="number"
              required
              defaultValue={alterar?.dados.preco}
              className="col-span-3"
            />
          ),
        },
        {
          label: (
            <Label htmlFor="quantidade" className="text-right">
              Quantidade
            </Label>
          ),
          input: (
            <Input
              id="quantidade"
              name="quantidade"
              type="number"
              required
              defaultValue={alterar?.dados.quantidade}
              className="col-span-3"
            />
          ),
        },
        {
          label: (
            <Label htmlFor="categoria" className="text-right">
              Categoria
            </Label>
          ),
          input: (
            <Select name="categoria" defaultValue={alterar?.dados.categoriaCodigo?.toString() ?? ""} >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" className="capitalize" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {
                    categorys.map(category => (
                      <SelectItem
                        key={`categoria-${category.codigo}`}
                        value={category.codigo.toString()}
                        className="capitalize"
                      >
                        {category.nome}
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          ),
        },
      ]}
    />
  );
}
