import ProductProvider from "@/components/product/ProductProvider";

import DataTableProduct from "@/components/product/DataTableProduct";

export default function ProductPage() {
  return (
    <>
      <ProductProvider>
        {/* <SectionCardsCategory />
        <ChartsCategory /> */}
        <DataTableProduct />
      </ProductProvider>
    </>
  );
}
