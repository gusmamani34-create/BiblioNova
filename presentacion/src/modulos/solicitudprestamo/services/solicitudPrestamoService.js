const API_URL = "https://biblionova-5pzj.onrender.com";

export async function obtenerSolicitudesPrestamo() {

    const respuesta = await fetch(`${API_URL}/solicitudprestamo`);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las solicitudes de préstamo");
    }

    return await respuesta.json();
}

export async function obtenerLibros() {
    const respuesta = await fetch(`${API_URL}/libro`);

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener los libros.");
    }

    return await respuesta.json();
}

/*export async function registrarSolicitud(datos) {
    const respuesta = await fetch(`${API_URL}/solicitudprestamo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    if (!respuesta.ok) {
        throw new Error("No se pudo registrar la solicitud.");
    }

    return await respuesta.json();
}*/

export async function registrarSolicitud(datos) {

    const respuesta = await fetch(`${API_URL}/solicitudprestamo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();

    if (!respuesta.ok) {
        console.error("Error del servidor:", resultado);
        throw new Error(
            resultado.detail || "No se pudo registrar la solicitud."
        );
    }

    return resultado;
}