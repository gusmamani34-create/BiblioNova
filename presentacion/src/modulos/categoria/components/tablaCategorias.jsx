
function TablaCategorias({ categorias }) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

      <table className="w-full text-left">

        <thead className="bg-gray-50 text-gray-700">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Nombre de categoría</th>
            <th className="px-6 py-4">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">

          {categorias.length > 0 ? (
            categorias.map((categoria) => (
              <tr key={categoria.idCategoria}>
                <td className="px-6 py-4">
                  {categoria.idCategoria}
                </td>

                <td className="px-6 py-4 font-medium text-gray-800">
                  {categoria.nombreCategoria}
                </td>

                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    Editar
                  </button>

                  <button className="ml-4 text-red-600 hover:text-red-800">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                No hay categorías registradas.
              </td>
            </tr>
          )}

        </tbody>
      </table>

    </div>
  );
}

export default TablaCategorias;
