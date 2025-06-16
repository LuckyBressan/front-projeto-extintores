import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import ClientPage from "./pages/ClientPage";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<HomePage />} />
                <Route path="/categorias" element={<CategoryPage />} />
                <Route path="/produtos"   element={<ProductPage />} />
                <Route path="/clientes"   element={<ClientPage />} />
            </Routes>
        </BrowserRouter>
    )
}