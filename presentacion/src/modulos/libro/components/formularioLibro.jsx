
function FormularioLibro({
    datosLibro,
    manejarCambio,
    manejarRegistro,
    categorias,
    cargando,
    cargandoCategorias,
    mensaje,
    error
}) {

    return (
        <section className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-200 p-5 sm:p-8">

            {/* ENCABEZADO */}
            <div className="mb-7 text-center">

                <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-3xl">📚</span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                        BiblioNova
                    </h1>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Registrar nuevo libro
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                    Completa los siguientes datos para agregar un libro al catálogo.
                </p>

            </div>

            {/* MENSAJES */}
            {mensaje && (
                <div className="mb-5 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
                    {mensaje}
                </div>
            )}

            {error && (
                <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {/* FORMULARIO */}
            <form onSubmit={manejarRegistro} className="space-y-5">

                {/* TITULO */}
                <div>
                    <label
                        htmlFor="titulo"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Título del libro
                    </label>

                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={datosLibro.titulo}
                        onChange={manejarCambio}
                        placeholder="Ej. Cien años de soledad"
                        required
                        maxLength={150}
                        disabled={cargando}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />
                </div>

                {/* AUTOR Y EDITORIAL */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    <div>
                        <label
                            htmlFor="autor"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Autor
                        </label>

                        <input
                            type="text"
                            id="autor"
                            name="autor"
                            value={datosLibro.autor}
                            onChange={manejarCambio}
                            placeholder="Nombre del autor"
                            required
                            maxLength={60}
                            disabled={cargando}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="editoria"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Editorial
                        </label>

                        <input
                            type="text"
                            id="editoria"
                            name="editoria"
                            value={datosLibro.editoria}
                            onChange={manejarCambio}
                            placeholder="Nombre de la editorial"
                            required
                            maxLength={60}
                            disabled={cargando}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        />
                    </div>

                </div>

                {/* CATEGORIA */}
                <div>
                    <label
                        htmlFor="idCategoria"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Categoría
                    </label>

                    <select
                        id="idCategoria"
                        name="idCategoria"
                        value={datosLibro.idCategoria}
                        onChange={manejarCambio}
                        required
                        disabled={cargando || cargandoCategorias}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    >
                        <option value="">
                            {cargandoCategorias
                                ? "Cargando categorías..."
                                : "Selecciona una categoría"}
                        </option>

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

                {/* DESCRIPCION */}
                <div>
                    <label
                        htmlFor="descripcion"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Descripción
                    </label>

                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={datosLibro.descripcion}
                        onChange={manejarCambio}
                        placeholder="Escribe una breve descripción del libro..."
                        rows={4}
                        required
                        disabled={cargando}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />
                </div>

                {/* IMAGEN */}
                <div>
                    <label
                        htmlFor="imagenurl"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        URL de la imagen
                    </label>

                    <input
                        type="url"
                        id="imagenurl"
                        name="imagenurl"
                        value={datosLibro.imagenurl}
                        onChange={manejarCambio}
                        placeholder="https://ejemplo.com/portada.jpg"
                        required
                        disabled={cargando}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                    />

                    <p className="text-xs text-gray-500 mt-1">
                        Introduce un enlace directo a la portada del libro.
                    </p>
                </div>

                {/* VISTA PREVIA DE IMAGEN */}
                {datosLibro.imagenurl && (
                    <div className="flex justify-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <img
                            src={datosLibro.imagenurl}
                            alt="Vista previa de la portada"
                            className="max-h-48 max-w-full object-contain rounded-md"
                            onError={(evento) => {
                                evento.currentTarget.style.display = "none";
                            }}
                            onLoad={(evento) => {
                                evento.currentTarget.style.display = "block";
                            }}
                        />
                    </div>
                )}

                {/* BOTON */}
                <button
                    type="submit"
                    disabled={cargando || cargandoCategorias || categorias.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                    {cargando
                        ? "Registrando libro..."
                        : "Registrar libro"}
                </button>

            </form>

        </section>
    );
}

export default FormularioLibro;
