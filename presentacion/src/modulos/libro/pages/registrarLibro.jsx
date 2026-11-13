
import { useEffect, useState } from "react";
import FormularioLibro from "../components/formularioLibro";
import { obtenerCategorias } from "../../categoria/services/categoriaservices";
import { registrarLibro } from "../services/libroService";

function RegistrarLibro() {

    // =====================================
    // ESTADOS
    // =====================================

    const [categorias, setCategorias] = useState([]);

    const [datosLibro, setDatosLibro] = useState({
        idCategoria: "",
        titulo: "",
        autor: "",
        editoria: "",
        descripcion: "",
        imagenurl: ""
    });

    const [cargando, setCargando] = useState(false);
    const [cargandoCategorias, setCargandoCategorias] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const [error, setError] = useState("");

    // =====================================
    // OBTENER CATEGORIAS
    // =====================================

    useEffect(() => {

        async function cargarCategorias() {

            try {

                const respuesta = await obtenerCategorias();
                setCategorias(respuesta);

            } catch (error) {

                console.error("Error al cargar categorías:", error);
                setError("No se pudieron cargar las categorías.");

            } finally {

                setCargandoCategorias(false);
            }
        }

        cargarCategorias();

    }, []);

    // =====================================
    // ACTUALIZAR DATOS DEL FORMULARIO
    // =====================================

    function manejarCambio(evento) {

        const { name, value } = evento.target;

        setDatosLibro((datosAnteriores) => ({
            ...datosAnteriores,
            [name]: value
        }));
    }

    // =====================================
    // REGISTRAR LIBRO
    // =====================================

    async function manejarRegistro(evento) {

        evento.preventDefault();

        setMensaje("");
        setError("");

        // PREPARAR DATOS PARA FASTAPI

        const datos = {
            idCategoria: Number(datosLibro.idCategoria),
            titulo: datosLibro.titulo.trim(),
            autor: datosLibro.autor.trim(),
            editoria: datosLibro.editoria.trim(),
            descripcion: datosLibro.descripcion.trim(),
            imagenurl: datosLibro.imagenurl.trim()
        };

        // VALIDAR CAMPOS

        if (
            !datos.idCategoria ||
            !datos.titulo ||
            !datos.autor ||
            !datos.editoria ||
            !datos.descripcion ||
            !datos.imagenurl
        ) {

            setError("Debes completar todos los campos.");
            return;
        }

        try {

            setCargando(true);

            // ENVIAR DATOS AL BACKEND
            await registrarLibro(datos);

            // MOSTRAR CONFIRMACION
            setMensaje("¡Libro registrado correctamente!");

            // LIMPIAR FORMULARIO
            setDatosLibro({
                idCategoria: "",
                titulo: "",
                autor: "",
                editoria: "",
                descripcion: "",
                imagenurl: ""
            });

        } catch (error) {

            console.error("Error al registrar libro:", error);
            setError(error.message || "No se pudo registrar el libro.");

        } finally {

            setCargando(false);
        }
    }

    // =====================================
    // INTERFAZ
    // =====================================

    return (

        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">

            <FormularioLibro
                datosLibro={datosLibro}
                manejarCambio={manejarCambio}
                manejarRegistro={manejarRegistro}
                categorias={categorias}
                cargando={cargando}
                cargandoCategorias={cargandoCategorias}
                mensaje={mensaje}
                error={error}
            />

        </main>
    );
}

export default RegistrarLibro;
