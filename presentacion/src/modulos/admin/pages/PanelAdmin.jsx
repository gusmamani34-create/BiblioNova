
import { Link } from "react-router-dom";

function PanelAdmin() {

    const opciones = [
        {
            titulo: "Libros registrados",
            descripcion: "Consultar y gestionar los libros del catálogo.",
            icono: "📚",
            ruta: "/admin/libros",
            color: "bg-blue-50"
        },
        {
            titulo: "Registrar libro",
            descripcion: "Agregar nuevos libros al catálogo.",
            icono: "➕",
            ruta: "/libros/registrar",
            color: "bg-green-50"
        },
        {
            titulo: "Categorías",
            descripcion: "Consultar las categorías existentes.",
            icono: "🏷️",
            ruta: "/categorias",
            color: "bg-purple-50"
        },
        {
            titulo: "Registrar categoría",
            descripcion: "Agregar nuevas categorías de libros.",
            icono: "📂",
            ruta: "/categorias/registrar",
            color: "bg-yellow-50"
        },
        {
            titulo: "Solicitudes de préstamo",
            descripcion: "Consultar las solicitudes realizadas por los usuarios.",
            icono: "📋",
            ruta: "/solicitudes",
            color: "bg-orange-50"
        }
    ];

    return (

        <main className="min-h-screen bg-gray-50 p-5 sm:p-8">

            <div className="max-w-6xl mx-auto">

                {/* ENCABEZADO */}

                <header className="mb-10">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                                BiblioNova
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Panel de administración
                            </p>
                        </div>

                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-medium transition-colors"
                        >
                            <span>🏠</span>
                            Ir a la biblioteca
                        </Link>

                    </div>

                    <div className="mt-6 border-b border-gray-200"></div>

                </header>

                {/* BIENVENIDA */}

                <section className="mb-8">

                    <h2 className="text-xl font-semibold text-gray-800">
                        Bienvenido al panel administrativo
                    </h2>

                    <p className="text-gray-600 mt-2">
                        Desde aquí puedes gestionar los libros, categorías y solicitudes de préstamo de la biblioteca.
                    </p>

                </section>

                {/* OPCIONES DE NAVEGACION */}

                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                    {opciones.map((opcion, indice) => (

                        <Link
                            key={indice}
                            to={opcion.ruta}
                            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
                        >

                            <div className={`w-12 h-12 ${opcion.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                                {opcion.icono}
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                                {opcion.titulo}
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                {opcion.descripcion}
                            </p>

                            <div className="mt-5 flex items-center text-blue-600 text-sm font-medium">
                                Acceder
                                <span className="ml-2">→</span>
                            </div>

                        </Link>

                    ))}

                </section>

            </div>

        </main>
    );
}

export default PanelAdmin;
