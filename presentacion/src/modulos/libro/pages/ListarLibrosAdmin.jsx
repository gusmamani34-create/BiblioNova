
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerLibros } from "../services/libroService";
import { obtenerCategorias } from "../../categoria/services/categoriaservices";

function ListarLibrosAdmin() {

    // =====================================
    // ESTADOS
    // =====================================

    const [libros, setLibros] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    // =====================================
    // CARGAR LIBROS Y CATEGORIAS
    // =====================================

    useEffect(() => {

        async function cargarDatos() {

            try {

                const [respuestaLibros, respuestaCategorias] =
                    await Promise.all([
                        obtenerLibros(),
                        obtenerCategorias()
                    ]);

                setLibros(respuestaLibros);
                setCategorias(respuestaCategorias);

            } catch (error) {

                console.error("Error al cargar datos:", error);
                setError("No se pudieron cargar los datos del catálogo.");

            } finally {

                setCargando(false);
            }
        }

        cargarDatos();

    }, []);

    // =====================================
    // FILTRAR LIBROS
    // =====================================

    const librosFiltrados = libros.filter((libro) => {

        const coincideBusqueda =
            libro.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
            libro.autor.toLowerCase().includes(busqueda.toLowerCase());

        const coincideCategoria =
            categoriaSeleccionada === "" ||
            String(libro.idCategoria) === categoriaSeleccionada;

        return coincideBusqueda && coincideCategoria;
    });

    // =====================================
    // INTERFAZ
    // =====================================

    return (

        <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

            <div className="max-w-7xl mx-auto">

                {/* ENCABEZADO */}

                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            Gestión de libros
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Consulta y administra los libros registrados en BiblioNova.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">

                        <Link
                            to="/admin"
                            className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
                        >
                            Panel administrativo
                        </Link>

                        <Link
                            to="/libros/registrar"
                            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
                        >
                            + Registrar libro
                        </Link>

                    </div>

                </header>

                {/* RESUMEN */}

                <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">

                    <p className="text-sm text-gray-500">
                        Total de libros registrados
                    </p>

                    <p className="text-3xl font-bold text-gray-800 mt-1">
                        {libros.length}
                    </p>

                </section>

                {/* BUSQUEDA Y FILTROS */}

                <section className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label
                                htmlFor="busqueda"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Buscar libro
                            </label>

                            <input
                                type="text"
                                id="busqueda"
                                value={busqueda}
                                onChange={(evento) => setBusqueda(evento.target.value)}
                                placeholder="Buscar por título o autor..."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="categoria"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Filtrar por categoría
                            </label>

                            <select
                                id="categoria"
                                value={categoriaSeleccionada}
                                onChange={(evento) => setCategoriaSeleccionada(evento.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Todas las categorías</option>

                                {categorias.map((categoria) => (
                                    <option
                                        key={categoria.idCategoria}
                                        value={categoria.idCategoria}
                                    >
                                        {categoria.nombreCategoria}
                                    </option>
                                ))}

                            </select>
                        </div>

                    </div>

                </section>

                {/* TABLA DE LIBROS */}

                <section className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                    <div className="p-5 border-b border-gray-200">

                        <h2 className="text-lg font-semibold text-gray-800">
                            Libros registrados
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Resultados encontrados: {librosFiltrados.length}
                        </p>

                    </div>

                    {cargando ? (

                        <div className="p-10 text-center text-gray-500">
                            Cargando libros...
                        </div>

                    ) : error ? (

                        <div className="p-10 text-center text-red-600">
                            {error}
                        </div>

                    ) : librosFiltrados.length === 0 ? (

                        <div className="p-10 text-center text-gray-500">
                            No se encontraron libros registrados.
                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm text-left">

                                <thead className="bg-gray-50 text-gray-600 uppercase text-xs">

                                    <tr>
                                        <th className="px-5 py-4">ID</th>
                                        <th className="px-5 py-4">Portada</th>
                                        <th className="px-5 py-4">Título</th>
                                        <th className="px-5 py-4">Autor</th>
                                        <th className="px-5 py-4">Editorial</th>
                                        <th className="px-5 py-4">Categoría</th>
                                        <th className="px-5 py-4">Estado</th>
                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray-200">

                                    {librosFiltrados.map((libro) => {

                                        const categoria = categorias.find(
                                            (item) =>
                                                item.idCategoria === libro.idCategoria
                                        );

                                        return (

                                            <tr
                                                key={libro.idLibro}
                                                className="hover:bg-gray-50 transition-colors"
                                            >

                                                <td className="px-5 py-4 text-gray-600">
                                                    {libro.idLibro}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <img
                                                        src={libro.imagenurl}
                                                        alt={libro.titulo}
                                                        className="w-12 h-16 object-cover rounded border border-gray-200"
                                                    />
                                                </td>

                                                <td className="px-5 py-4 font-medium text-gray-800 min-w-48">
                                                    {libro.titulo}
                                                </td>

                                                <td className="px-5 py-4 text-gray-600">
                                                    {libro.autor}
                                                </td>

                                                <td className="px-5 py-4 text-gray-600">
                                                    {libro.editoria}
                                                </td>

                                                <td className="px-5 py-4 text-gray-600">
                                                    {categoria
                                                        ? categoria.nombreCategoria
                                                        : "Sin categoría"}
                                                </td>

                                                <td className="px-5 py-4">

                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        libro.estado === "activo"
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}>
                                                        {libro.estado || "Sin estado"}
                                                    </span>

                                                </td>

                                            </tr>

                                        );
                                    })}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>

            </div>

        </main>
    );
}

export default ListarLibrosAdmin;
