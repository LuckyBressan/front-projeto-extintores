import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<HomePage />} />
                <Route path="/categorias" index element={<CategoryPage />} />
                <Route path="/produtos" index element={<ProductPage />} />
            </Routes>
        </BrowserRouter>
    )
}