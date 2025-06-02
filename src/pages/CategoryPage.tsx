import { CategoryProvider } from "@/components/category/CategoryProvider";
import DataTableCategory from "@/components/category/DataTableCategory";

export default function CategoryPage() {
  return (
    <>
      <CategoryProvider>
        <DataTableCategory />
      </CategoryProvider>
    </>
  );
}
