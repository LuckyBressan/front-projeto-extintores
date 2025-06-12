import { MdOutlineCategory } from "react-icons/md";
import { PackageSearch } from "lucide-react";

import { useCategoryContext } from "./CategoryProvider";

import Card from "../Card";

export default function SectionCardsCategory() {
  const { categorys, categorysWithMostProducts, categoryWithLeastProducts } =
    useCategoryContext();

  const categoryWithMostProduct = categorysWithMostProducts[0];

  const cards = [
    <Card
      icon={<MdOutlineCategory />}
      value={categorys.length}
      description="Total de Categorias"
    />,
    <Card
      icon={<PackageSearch />}
      value={categoryWithMostProduct?.nome ?? ""}
      description="Categoria com mais produtos"
    />,
    <Card
      icon={<PackageSearch />}
      value={categoryWithLeastProducts.nome ?? ""}
      description="Categoria com menos produtos"
    />,
  ];

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-3">
      {cards.map((card) => card)}
    </div>
  );
}
