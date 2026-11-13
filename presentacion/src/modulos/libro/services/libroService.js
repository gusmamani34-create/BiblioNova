
const API_URL = "http://127.0.0.1:8000";

export async function obtenerLibros() {
    try {
        const respuesta = await fetch(`${API_URL}/libro`);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los libros");
        }

        const datos = await respuesta.json();

        // Acepta una lista directa o una lista dentro de una propiedad.
        if (Array.isArray(datos)) return datos;

        return datos.libros ?? datos.data ?? [];
    } catch (error) {
        console.error("Error al obtener libros:", error);
        throw error;
    }
}

export async function registrarLibro(datosLibro) {
    try {
        const respuesta = await fetch(`${API_URL}/libro`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datosLibro)
        });

        const resultado = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(
                typeof resultado.detail === "string"
                    ? resultado.detail
                    : JSON.stringify(resultado.detail || resultado)
            );
        }

        return resultado;

    } catch (error) {
        console.error("Error al registrar libro:", error);
        throw error;
    }
}
