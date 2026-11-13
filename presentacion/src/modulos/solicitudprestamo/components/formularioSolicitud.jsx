
function FormularioSolicitud({
    datosSolicitud,
    manejarCambio,
    manejarRegistro,
    libros,
    cargando,
    cargandoLibros,
    mensaje,
    error
}) {
    return (
        <section className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

            {/* Encabezado */}
            <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    BiblioNova
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-800">
                    Solicitar préstamo
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                    Completa tus datos para solicitar un libro de nuestro catálogo.
                </p>
            </div>

            {/* Formulario */}
            <form onSubmit={manejarRegistro}>

                {/* Nombre */}
                <div className="mb-5">
                    <label
                        htmlFor="nombreSolicitante"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Nombre del solicitante
                    </label>

                    <input
                        id="nombreSolicitante"
                        name="nombreSolicitante"
                        type="text"
                        value={datosSolicitud.nombreSolicitante}
                        onChange={manejarCambio}
                        placeholder="Ingresa tu nombre"
                        maxLength={60}
                        required
                        disabled={cargando}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Apellido */}
                <div className="mb-5">
                    <label
                        htmlFor="apellidoSolicitante"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Apellido del solicitante
                    </label>

                    <input
                        id="apellidoSolicitante"
                        name="apellidoSolicitante"
                        type="text"
                        value={datosSolicitud.apellidoSolicitante}
                        onChange={manejarCambio}
                        placeholder="Ingresa tu apellido"
                        maxLength={60}
                        required
                        disabled={cargando}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Teléfono */}
                <div className="mb-5">
                    <label
                        htmlFor="telefono"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Número de teléfono
                    </label>

                    <input
                        id="telefono"
                        name="telefono"
                        type="tel"
                        value={datosSolicitud.telefono}
                        onChange={manejarCambio}
                        placeholder="Ej. 70000000"
                        maxLength={20}
                        required
                        disabled={cargando}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                {/* Selección del libro */}
                <div className="mb-6">
                    <label
                        htmlFor="idLibro"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Selecciona el libro
                    </label>

                    <select
                        id="idLibro"
                        name="idLibro"
                        value={datosSolicitud.idLibro}
                        onChange={manejarCambio}
                        required
                        disabled={cargando || cargandoLibros}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                        <option value="">
                            {cargandoLibros
                                ? "Cargando libros..."
                                : "Selecciona un libro"}
                        </option>

                        {libros.map((libro) => (
                            <option
                                key={libro.idLibro}
                                value={libro.idLibro}
                            >
                                {libro.titulo}
                            </option>
                        ))}
                    </select>

                    {!cargandoLibros && libros.length === 0 && (
                        <p className="mt-2 text-sm text-gray-500">
                            No hay libros disponibles para seleccionar.
                        </p>
                    )}
                </div>

                {/* Mensaje de éxito */}
                {mensaje && (
                    <p className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                        {mensaje}
                    </p>
                )}

                {/* Mensaje de error */}
                {error && (
                    <p className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                        {error}
                    </p>
                )}

                {/* Botón */}
                <button
                    type="submit"
                    disabled={cargando || cargandoLibros || libros.length === 0}
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                    {cargando
                        ? "Registrando solicitud..."
                        : "Registrar solicitud"}
                </button>

            </form>
        </section>
    );
}

export default FormularioSolicitud;
