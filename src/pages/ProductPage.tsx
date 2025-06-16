import ProductProvider from "@/components/product/ProductProvider";

import DataTableProduct from "@/components/product/DataTableProduct";
import { CategoryProvider } from "@/components/category/CategoryProvider";

export default function ProductPage() {
  return (
    <>
      <CategoryProvider load={false}>
        <ProductProvider>
          {/* <SectionCardsCategory />
          <ChartsCategory /> */}
          <DataTableProduct />
        </ProductProvider>
      </CategoryProvider>
    </>
  );
}
