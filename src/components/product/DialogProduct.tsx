import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

import { ChevronDown, CirclePlus } from "lucide-react";

import DialogForm from "../DialogForm";

import type { Product } from "@/@types/Product";
import { useProductContext } from "./ProductProvider";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MdCategory } from "react-icons/md";
import { useCategoryContext } from "../category/CategoryProvider";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function DialogProduct({
  alterar,
}: {
  alterar?: {
    trigger: React.ReactNode;
    dados: Product;
  };
}) {

  const { categorys } = useCategoryContext();
  const { addProduct, updateProduct } = useProductContext();
  
  const [categorySelected, setCategorySelected] = useState('');

  const title = alterar ? "Alterar" : "Incluir";

  function handleKeyUp(

  ) {
    // if (!isNaN(Number(e.key))) {
    //   e.target.value = e.target.value.replace(/\d/g, "");
    // }
  }

  const handleSubmit = (product: Product, alterar: boolean) => {

    if(alterar) {
      updateProduct(product.codigo, product)
      return;
    }
    addProduct(product);
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
          console.log(data)
          // handleSubmit(data as Product, !!alterar)
        }
      }}
      //Fechar o dialog, limpa o state
      onOpenChange={open => !open && setCategorySelected('')}
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
              required
              defaultValue={alterar?.dados.nome}
              className="col-span-3"
              onKeyUp={handleKeyUp}
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
              required
              defaultValue={alterar?.dados.descricao}
              className="col-span-3"
              onKeyUp={handleKeyUp}
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
              type="number"
              required
              defaultValue={alterar?.dados.preco}
              className="col-span-3"
              onKeyUp={handleKeyUp}
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
              type="number"
              required
              defaultValue={alterar?.dados.quantidade}
              className="col-span-3"
              onKeyUp={handleKeyUp}
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
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma categoria" className="capitalize" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categorys.map(category => (
                    <SelectItem
                      key={`categoria-${category.codigo}`}
                      value={category.nome}
                      className="capitalize"
                      onClick={() => setCategorySelected(category.nome)}
                    >
                      {category.nome}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ),
        },
      ]}
    />
  );
}
