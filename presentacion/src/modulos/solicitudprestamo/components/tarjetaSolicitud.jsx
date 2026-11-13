
function TarjetaSolicitud({ solicitud, nombreLibro }) {

    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Encabezado del carnet */}
            <div className="bg-gradient-to-r from-slate-900 to-blue-800 px-6 py-5">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-blue-300">
                            BiblioNova
                        </p>

                        <h2 className="mt-1 text-lg font-bold text-white">
                            Solicitud de préstamo
                        </h2>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-xl text-white">
                        📚
                    </div>

                </div>

            </div>

            {/* Información del solicitante */}
            <div className="p-6">

                <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Solicitante
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-slate-800">
                        {solicitud.nombreSolicitante} {solicitud.apellidoSolicitante}
                    </h3>
                </div>

                <div className="grid grid-cols-2 gap-4">

                    <div>
                        <p className="text-xs font-semibold text-gray-400">
                            ID solicitud
                        </p>

                        <p className="mt-1 font-semibold text-slate-700">
                            #{solicitud.idSolicitudPrestamo}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-400">
                            Libro solicitado
                        </p>

                        <p className="mt-1 break-words font-semibold text-blue-800">
                            {nombreLibro || "Libro no encontrado"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-400">
                            Teléfono
                        </p>

                        <p className="mt-1 break-words font-semibold text-slate-700">
                            {solicitud.telefono}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs font-semibold text-gray-400">
                            Fecha de solicitud
                        </p>

                        <p className="mt-1 font-semibold text-slate-700">
                            {solicitud.fechaSolicitud}
                        </p>
                    </div>

                </div>

                {/* Pie del carnet */}
                <div className="mt-6 border-t border-dashed border-gray-300 pt-4">

                    <div className="flex items-center justify-between">

                        <span className="text-xs font-medium text-gray-400">
                            Registro bibliotecario
                        </span>

                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            Solicitud registrada
                        </span>

                    </div>

                </div>

            </div>

        </article>
    );
}

export default TarjetaSolicitud;
