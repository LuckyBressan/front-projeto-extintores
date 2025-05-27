import { CategoriaProvider } from "@/components/categoria/CategoriaProvider";
import DataTableCategoria from "@/components/categoria/DataTableCategoria";

export default function CategoriaPage() {
    return (
        <>
            <CategoriaProvider>
                <DataTableCategoria />
            </CategoriaProvider>
        </>
    )
}