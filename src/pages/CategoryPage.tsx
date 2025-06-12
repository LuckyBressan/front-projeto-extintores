import { CategoryProvider } from "@/components/category/CategoryProvider";
import ChartsCategory from "@/components/category/ChartsCategory";
import DataTableCategory from "@/components/category/DataTableCategory";
import SectionCardsCategory from "@/components/category/SectionCardsCategory";

export default function CategoryPage() {
  return (
    <>
      <CategoryProvider>
        <SectionCardsCategory />
        <ChartsCategory />
        <DataTableCategory />
      </CategoryProvider>
    </>
  );
}
