
import { useState } from "react";

import FormularioCategoria from "../components/formularioCategoria";
import { registrarCategoria } from "../services/categoriaservices";

export default function RegistrarCategoria() {

    // Estados del formulario
    const [nombreCategoria, setNombreCategoria] = useState("");
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    // Gestionar registro
    async function manejarRegistro(evento) {
        evento.preventDefault();

        setMensaje("");
        setError("");

        const nombre = nombreCategoria.trim();

        if (!nombre) {
            setError("Debes ingresar el nombre de la categoría.");
            return;
        }

        try {
            setCargando(true);

            // Llamar al servicio de comunicación
            await registrarCategoria(nombre);

            setMensaje("Categoría registrada correctamente.");
            setNombreCategoria("");

        } catch (error) {
            setError(error.message);

        } finally {
            setCargando(false);
        }
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
            <FormularioCategoria
                nombreCategoria={nombreCategoria}
                setNombreCategoria={setNombreCategoria}
                manejarRegistro={manejarRegistro}
                cargando={cargando}
                mensaje={mensaje}
                error={error}
            />

        </main>
    );
}
