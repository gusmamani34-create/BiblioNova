
export default function FormularioCategoria({
    nombreCategoria,
    setNombreCategoria,
    manejarRegistro,
    cargando,
    mensaje,
    error
}) {

    return (
        <section className="w-full max-w-lg bg-white border border-gray-200 rounded-xl p-6 sm:p-8 shadow-sm">

            {/* Encabezado */}
            <div className="mb-8">
               <h1 className="text-2xl font-bold text-gray-800">
                    BiblioNova
                </h1>

                <h2 className="text-lg font-semibold text-gray-700 mt-1">
                    Registrar categoría
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                    Añade una nueva categoría al catálogo de BiblioNova.
                </p>
            </div>

            {/* Formulario */}
            <form onSubmit={manejarRegistro}>

                <div className="mb-6">

                    <label
                        htmlFor="nombreCategoria"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Nombre de la categoría
                    </label>

                    <input
                        id="nombreCategoria"
                        type="text"
                        value={nombreCategoria}
                        onChange={(evento) =>
                            setNombreCategoria(evento.target.value)
                        }
                        placeholder="Ej. Literatura"
                        maxLength={50}
                        required
                        disabled={cargando}
                        className="
                            w-full px-4 py-3 rounded-lg
                            bg-white border border-gray-300
                            text-gray-800 placeholder-gray-400
                            outline-none
                            focus:border-blue-500
                            focus:ring-2 focus:ring-blue-100
                            transition
                        "
                    />

                </div>

                {/* Mensaje de éxito */}
                {mensaje && (
                    <p className="mb-5 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                        {mensaje}
                    </p>
                )}

                {/* Mensaje de error */}
                {error && (
                    <p className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                        {error}
                    </p>
                )}

                {/* Botón */}
                <button
                    type="submit"
                    disabled={cargando}
                    className="
                        w-full py-3 rounded-lg
                        bg-blue-600 hover:bg-blue-700
                        disabled:bg-blue-300 disabled:cursor-not-allowed
                        text-white font-semibold
                        transition duration-200
                    "
                >
                    {cargando
                        ? "Registrando..."
                        : "Registrar categoría"}
                </button>

            </form>

        </section>
    );
}
