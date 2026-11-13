
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Biblioteca3D from "../components/Biblioteca3D";
import { obtenerLibros } from "../services/libroService";

export default function ListarLibros() {

    // =====================================
    // NAVEGACION
    // =====================================

    const navigate = useNavigate();

    // =====================================
    // ESTADOS
    // =====================================

    const [libros, setLibros] = useState([]);
    const [libroSeleccionado, setLibroSeleccionado] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // =====================================
    // CARGAR LIBROS DESDE FASTAPI
    // =====================================

    useEffect(() => {
        async function cargarLibros() {
            try {
                const datos = await obtenerLibros();
                setLibros(datos);
            } catch (error) {
                console.error(error);
                setError("No se pudo conectar con el catálogo.");
            } finally {
                setCargando(false);
            }
        }

        cargarLibros();
    }, []);

    // =====================================
    // SELECCIONAR LIBRO
    // =====================================

    const seleccionarLibro = useCallback((libro) => {
        setLibroSeleccionado(libro);
    }, []);

    // =====================================
    // CERRAR FICHA
    // =====================================

    function cerrarFicha() {
        setLibroSeleccionado(null);
    }

    // =====================================
    // SOLICITAR PRESTAMO
    // =====================================

    function solicitarPrestamo() {

        if (!libroSeleccionado) return;

        navigate("/solicitudes/registrar", {
            state: {
                libro: libroSeleccionado
            }
        });
    }

    // =====================================
    // INTERFAZ
    // =====================================

    return (
        <main className="relative w-full h-[100dvh] overflow-hidden bg-[#080d1c] text-white">

            {/* ESCENARIO 3D */}
            <Biblioteca3D
                libros={libros}
                onSeleccionarLibro={seleccionarLibro}
            />

            {/* ENCABEZADO */}
            <header className="absolute top-0 left-0 z-10 w-full px-5 md:px-12 py-5 pointer-events-none">

                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold tracking-wider text-white">
                            BIBLIONOVA
                        </h1>

                        <p className="text-xs md:text-sm text-blue-300 tracking-widest">
                            BIBLIOTECA DIGITAL INTERACTIVA
                        </p>
                    </div>

                    <div className="hidden md:block text-right">
                        <p className="text-sm text-gray-300">
                            Explora nuevos conocimientos
                        </p>

                        <p className="text-xs text-blue-400">
                            Catálogo de libros
                        </p>
                    </div>

                </div>
            </header>

            {/* FICHA DEL LIBRO SELECCIONADO */}
            {libroSeleccionado && (
                <section
                    className="
                        absolute z-30
                        top-20 right-3 left-3
                        md:top-24 md:right-8 md:left-auto
                        w-auto md:w-[370px]
                        max-h-[calc(100dvh-7rem)]
                        overflow-y-auto
                        overscroll-contain
                        rounded-2xl
                        border border-blue-400/30
                        bg-slate-950/95
                        backdrop-blur-xl
                        shadow-2xl shadow-blue-950/50
                    "
                >

                    {/* CABECERA */}
                    <div className="
                        sticky top-0 z-10
                        flex items-start justify-between gap-3
                        p-5
                        bg-slate-950/95 backdrop-blur-xl
                        border-b border-white/10
                    ">

                        <div className="min-w-0">
                            <p className="text-xs uppercase tracking-widest text-blue-400">
                                Libro seleccionado
                            </p>

                            <h2 className="text-xl font-bold mt-2 break-words">
                                {libroSeleccionado.titulo}
                            </h2>
                        </div>

                        <button
                            type="button"
                            onClick={cerrarFicha}
                            className="
                                shrink-0 w-8 h-8 rounded-full
                                bg-white/10 hover:bg-white/20
                                text-gray-300 hover:text-white
                                transition
                            "
                            aria-label="Cerrar ficha"
                        >
                            ×
                        </button>

                    </div>

                    {/* INFORMACION */}
                    <div className="p-5">

                        {/* PORTADA */}
                        {libroSeleccionado.imagenurl ? (
                            <div className="
                                w-full h-40 flex justify-center items-center
                                bg-white/5 rounded-xl overflow-hidden mb-5
                            ">
                                <img
                                    src={libroSeleccionado.imagenurl}
                                    alt={libroSeleccionado.titulo}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        ) : (
                            <div className="
                                w-full h-28 flex items-center justify-center
                                bg-white/5 rounded-xl mb-5 text-gray-500
                            ">
                                Sin portada disponible
                            </div>
                        )}

                        {/* TITULO */}
                        <div className="mb-4">
                            <p className="text-blue-400 text-xs uppercase tracking-wider">
                                Titulo
                            </p>

                            <p className="mt-1 text-gray-200 break-words">
                                {libroSeleccionado.titulo || "No especificado"}
                            </p>
                        </div>

                        {/* AUTOR */}
                        <div className="mb-4">
                            <p className="text-blue-400 text-xs uppercase tracking-wider">
                                Autor
                            </p>

                            <p className="mt-1 text-gray-200 break-words">
                                {libroSeleccionado.autor || "No especificado"}
                            </p>
                        </div>

                        {/* EDITORIAL */}
                        <div className="mb-4">
                            <p className="text-blue-400 text-xs uppercase tracking-wider">
                                Editorial
                            </p>

                            <p className="mt-1 text-gray-200 break-words">
                                {libroSeleccionado.editoria || "No especificada"}
                            </p>
                        </div>

                        

                        {/* DESCRIPCION */}
                        <div>
                            <p className="text-blue-400 text-xs uppercase tracking-wider">
                                Descripción
                            </p>

                            <p className="mt-1 text-gray-300 leading-relaxed break-words">
                                {libroSeleccionado.descripcion
                                    || "Sin descripción disponible."}
                            </p>
                        </div>

                        {/* BOTON SOLICITAR PRESTAMO */}
                        <button
                            type="button"
                            onClick={solicitarPrestamo}
                            className="
                                w-full mt-6 py-3 px-4
                                rounded-xl
                                bg-blue-600 hover:bg-blue-500
                                transition duration-200
                                font-semibold text-white
                                shadow-lg shadow-blue-900/30
                            "
                        >
                            Solicitar préstamo
                        </button>

                    </div>
                </section>
            )}

            {/* CARGANDO */}
            {cargando && (
                <div className="absolute bottom-16 left-5 z-20 text-sm text-blue-300">
                    Cargando catálogo...
                </div>
            )}

            {/* ERROR */}
            {error && (
                <div className="absolute bottom-16 left-5 z-20 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* INDICACIONES */}
            <div className="
                absolute bottom-5 left-1/2 -translate-x-1/2
                z-10 text-center pointer-events-none w-full px-4
            ">
                <p className="text-xs md:text-sm text-blue-200/80">
                    Mueve el cursor para explorar · Haz clic en un libro para seleccionarlo
                </p>
            </div>

        </main>
    );
}
