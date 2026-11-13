//responsable de realizar las peticiones http
//crear servicio de comunicacion
const API_URL="http://127.0.0.1:8000"

//async/await permite esperar la respuesta sin bloquear el hilo principal
export async function obtenerCategorias(){
    //fetch realiza la peticion get
    const respuestas=await fetch(`${API_URL}/categoria`);
    if(!respuestas.ok){
        throw new Error("no se pueden obtener las categorias");
    }
    return await respuestas.json();
}



export async function registrarCategoria(nombreCategoria) {
    const respuesta = await fetch(`${API_URL}/categoria`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nombreCategoria: nombreCategoria
        })
    });

    if (!respuesta.ok) {
        const error = await respuesta.json();
        throw new Error(error.detail || "No se pudo registrar la categoría");
    }

    return await respuesta.json();
}
