
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FormularioSolicitud from "../components/formularioSolicitud";
import { obtenerLibros } from "../../libro/services/libroService";
import { registrarSolicitud } from "../services/solicitudPrestamoService";

function RegistrarSolicitud() {

    // =====================================
    // NAVEGACION
    // =====================================

    const navigate = useNavigate();

    // =====================================
    // ESTADOS
    // =====================================

    const [libros, setLibros] = useState([]);

    const [datosSolicitud, setDatosSolicitud] = useState({
        nombreSolicitante: "",
        apellidoSolicitante: "",
        telefono: "",
        idLibro: ""
    });

    const [cargando, setCargando] = useState(false);
    const [cargandoLibros, setCargandoLibros] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    // =====================================
    // OBTENER LIBROS PARA EL SELECTOR
    // =====================================

    useEffect(() => {

        async function cargarLibros() {
            try {
                const respuesta = await obtenerLibros();
                setLibros(respuesta);

            } catch (error) {
                console.error(error);
                setError("No se pudieron cargar los libros.");

            } finally {
                setCargandoLibros(false);
            }
        }

        cargarLibros();

    }, []);

    // =====================================
    // ACTUALIZAR DATOS DEL FORMULARIO
    // =====================================

    function manejarCambio(evento) {

        const { name, value } = evento.target;

        setDatosSolicitud((datosAnteriores) => ({
            ...datosAnteriores,
            [name]: value
        }));
    }

    // =====================================
    // REGISTRAR SOLICITUD
    // =====================================

    async function manejarRegistro(evento) {

        evento.preventDefault();

        setMensaje("");
        setError("");

        const datos = {
            nombreSolicitante: datosSolicitud.nombreSolicitante.trim(),
            apellidoSolicitante: datosSolicitud.apellidoSolicitante.trim(),
            telefono: datosSolicitud.telefono.trim(),
            idLibro: Number(datosSolicitud.idLibro),
            fechaSolicitud: new Date().toISOString().split("T")[0]
        };

        // VALIDAR CAMPOS

        if (
            !datos.nombreSolicitante ||
            !datos.apellidoSolicitante ||
            !datos.telefono ||
            !datos.idLibro
        ) {
            setError("Debes completar todos los campos.");
            return;
        }

        try {

            setCargando(true);

            // ENVIAR SOLICITUD A FASTAPI
            await registrarSolicitud(datos);

            // REGRESAR A LA BIBLIOTECA 3D
            navigate("/", { replace: true });

        } catch (error) {

            console.error("Error al registrar solicitud:", error);
            setError(error.message);

        } finally {

            setCargando(false);
        }
    }

    // =====================================
    // INTERFAZ
    // =====================================

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">

            <FormularioSolicitud
                datosSolicitud={datosSolicitud}
                manejarCambio={manejarCambio}
                manejarRegistro={manejarRegistro}
                libros={libros}
                cargando={cargando}
                cargandoLibros={cargandoLibros}
                mensaje={mensaje}
                error={error}
            />

        </main>
    );
}

export default RegistrarSolicitud;
