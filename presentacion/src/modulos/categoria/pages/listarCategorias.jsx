
import { useState, useEffect } from "react";
import TablaCategorias from "../components/tablaCategorias";
import { obtenerCategorias } from "../services/categoriaservices";

function ListarCategorias() {

  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function cargarCategorias() {
      try {
        const datos = await obtenerCategorias();
        setCategorias(datos);
      } catch (error) {
        setError(error.message);
      } finally {
        setCargando(false);
      }
    }

    cargarCategorias();

  }, []);

  if (cargando) {
    return <p className="p-8">Cargando categorías...</p>;
  }

  if (error) {
    return <p className="p-8 text-red-600">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="mx-auto max-w-6xl">
        {/* Encabezado de la aplicación */}
        <header className="mb-10 border-b border-gray-200 pb-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-blue-900">
                BiblioNova
            </h1>

            <p className="mt-1 text-sm text-gray-500">
                Sistema de gestión bibliotecaria
            </p>
        </header>

        <h1 className="text-3xl font-bold text-gray-900">
          Gestión de categorías
        </h1>
        <div className="mt-6 mb-5">
            <button
                type="button"
                className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
            >
                + Registrar categoría
            </button>
        </div>

        <p className="mt-2 text-gray-600">
          Administra las categorías de la biblioteca.
        </p>

        <TablaCategorias categorias={categorias} />

      </div>

    </main>
  );
}

export default ListarCategorias;
