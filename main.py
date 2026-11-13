from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

#incorporacion de modulos 
from dominio.categoria import Categoria
from aplicacion.categoria import categoraservicio
from infraestructura.basededatos import Conexion
from infraestructura.basededatos.Conexion import engine, get_db

#importacion modulos libro 
from dominio.libro import Libro 
from aplicacion.libro import libroservicio

#incorporacion modulos solicitud prestamo
from dominio.solicitudprestamo import SolicitudPrestamo
from aplicacion.solicitudprestamo import solicitudprestamoservicio

# Crea la tabla en Supabase automáticamente si aún no existe
Conexion.Base.metadata.create_all(bind=engine)

#creacion de la API 
app= FastAPI(
    title="API de Catalogo",
    version="1.0.0",
    description="Servicio Backend conectado a postgreSQL en supabase"
)

#Habilitar cosrse para permitir llamadas desde vercel o desarrollo local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#obtener todos las categorias, db representa a la sesion, query representa a la consulta


#registrar Categoria, agrega esta ruta 
#descripcion por instruccion }
#@app.post("/categoria") establecer una ruta para registrar categoria
@app.post("/categoria")
def registrarcategoria(
    datos_categoria: Categoria.crearCategoria,
    db:Session = Depends(get_db)
):
    nueva_categoria=categoraservicio.registrarcategoriaservicio(
        db, datos_categoria
    )
    return nueva_categoria    

#mostrar categorias
@app.get("/categoria")
def mostrarcategorias(
    db:Session = Depends(get_db)
):
    categorias=categoraservicio.mostrarCategoriaServicio(db)
    return categorias

#registrar nuevo libro 
@app.post("/libro")
#funcion que pertenece a FastAPI su trabajo es recibir la peticion http, validar los datos con pydantic, Obtener la sesion del sqlalchemy, llamar al servicio
def registrarlibro(
    #nombre del parametro:los tipos de datos que deseamos recibir FastApi usa este esquema para validarlo
    datoslibro:Libro.crearLibro,
    #que fastAPI proporcione una sesion automaticamente a nuestro endpoint
    db:Session = Depends(get_db)
):
    nuevo_libro=libroservicio.registrarlibroservicio(
        db,
        datoslibro
    )
    return nuevo_libro

#mostrar libros 
@app.get("/libro")
def mostrarlibros(
    db:Session = Depends(get_db)
):
    libros=libroservicio.mostrarlibrosservicio(db)
    return libros


#registrar solicitud de prestamo
@app.post("/solicitudprestamo")
def registrarSolicitudPrestamo(
    datosolicitudprestamo:SolicitudPrestamo.crearSolicitudPrestamo,
    db:Session = Depends(get_db)
):
    nueva_solicitudprestamo=solicitudprestamoservicio.registrarsolicitudprestamoservicio(
        db,
        datosolicitudprestamo
    )

    return nueva_solicitudprestamo

#mostrar solicitudes pretamo
@app.get("/solicitudprestamo")
def mostrarSolicitudPrestamo(
    db:Session = Depends(get_db)
):
    solicitudes_prestamo=solicitudprestamoservicio.mostrarsolicitudprestamoservicio(db)
    return solicitudes_prestamo