import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CategoriaPage from "./pages/CategoriaPage";

export default function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" index element={<HomePage />} />
                <Route path="/categorias" index element={<CategoriaPage />} />
            </Routes>
        </BrowserRouter>
    )
}