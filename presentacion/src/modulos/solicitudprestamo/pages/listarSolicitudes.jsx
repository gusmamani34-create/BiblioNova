
import { useState, useEffect } from "react";

import TarjetaSolicitud from "../components/tarjetaSolicitud";

import { obtenerSolicitudesPrestamo } from "../services/solicitudPrestamoService";
import { obtenerLibros } from "../../libro/services/libroService";


function ListarSolicitudes() {

    const [solicitudes, setSolicitudes] = useState([]);
    const [libros, setLibros] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {

        async function cargarSolicitudes() {

            try {

                const [datosSolicitudes, datosLibros] = await Promise.all([
                    obtenerSolicitudesPrestamo(),
                    obtenerLibros()
                ]);

                setSolicitudes(datosSolicitudes);
                setLibros(datosLibros);

            } catch (error) {

                setError(error.message);

            } finally {

                setCargando(false);

            }

        }

        cargarSolicitudes();

    }, []);


    if (cargando) {
        return (
            <p className="p-8 text-center text-gray-600">
                Cargando solicitudes de préstamo...
            </p>
        );
    }


    if (error) {
        return (
            <p className="p-8 text-center text-red-600">
                {error}
            </p>
        );
    }


    return (

        <main className="min-h-screen bg-slate-100 p-4 sm:p-6 lg:p-10">

            <div className="mx-auto max-w-7xl">

                {/* Encabezado */}
                <header className="mb-10 border-b border-gray-200 pb-6">

                    <h1 className="text-3xl font-extrabold tracking-tight text-blue-900 sm:text-4xl">
                        BiblioNova
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Sistema de gestión bibliotecaria
                    </p>

                </header>


                {/* Título de sección */}
                <section>

                    <div className="mb-8">

                        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                            Solicitudes de préstamo
                        </h2>

                        <p className="mt-2 text-gray-600">
                            Consulta los registros de solicitudes de los usuarios.
                        </p>

                        <div className="mt-5 inline-flex rounded-lg bg-blue-100 px-4 py-2">

                            <span className="text-sm font-semibold text-blue-800">
                                Total de solicitudes: {solicitudes.length}
                            </span>

                        </div>

                    </div>


                    {/* Tarjetas responsivas */}
                    {solicitudes.length > 0 ? (

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

                            {solicitudes.map((solicitud) => {

                                const libro = libros.find(
                                    (libro) => String(libro.idLibro) === String(solicitud.idLibro)
                                );

                                return (

                                    <TarjetaSolicitud
                                        key={solicitud.idSolicitudPrestamo}
                                        solicitud={solicitud}
                                        nombreLibro={libro ? libro.titulo : "Libro no encontrado"}
                                    />

                                );

                            })}

                        </div>

                    ) : (

                        <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">

                            <p className="text-4xl">📚</p>

                            <h3 className="mt-4 text-lg font-bold text-gray-800">
                                No hay solicitudes registradas
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Cuando los usuarios soliciten préstamos, aparecerán aquí.
                            </p>

                        </div>

                    )}

                </section>

            </div>

        </main>

    );

}

export default ListarSolicitudes;
