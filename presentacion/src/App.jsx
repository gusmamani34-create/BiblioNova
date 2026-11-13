import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListarCategorias from "./modulos/categoria/pages/listarCategorias";
import ListarSolicitudes from "./modulos/solicitudprestamo/pages/listarSolicitudes";
import ListarLibros from "./modulos/libro/pages/listarLibros";
import RegistrarCategoria from "./modulos/categoria/pages/registrarCategoria";
import RegistrarSolicitud from "./modulos/solicitudprestamo/pages/registrarSolicitud";
import PanelAdmin from "./modulos/admin/pages/PanelAdmin";
import RegistrarLibro from "./modulos/libro/pages/registrarLibro";
import ListarLibrosAdmin from "./modulos/libro/pages/ListarLibrosAdmin";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/"
                    element={<ListarLibros />}
                />

                <Route
                    path="/categorias"
                    element={<ListarCategorias />}
                />

                <Route
                    path="/categorias/registrar"
                    element={<RegistrarCategoria />}
                />

                <Route
                    path="/solicitudes"
                    element={<ListarSolicitudes />}
                />

                <Route
                    path="/solicitudes/registrar"
                    element={<RegistrarSolicitud />}
                />

                <Route 
                    path="/admin"  
                    element={<PanelAdmin />} 
                />
                <Route
                    path="/libros/registrar"
                    element={<RegistrarLibro />}
                />

                <Route
                    path="/admin/libros"
                    element={<ListarLibrosAdmin />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;