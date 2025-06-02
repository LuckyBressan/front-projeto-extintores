import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<HomePage />} />
                <Route path="/categorias" index element={<CategoryPage />} />
            </Routes>
        </BrowserRouter>
    )
}