#importacion de modulos
from sqlalchemy import Column, Integer, String, ForeignKey, Text, Date
from infraestructura.basededatos.Conexion import Base

#representacion de la tabla Solicitud Prestamo
class SolicitudPrestamo(Base):
    __tablename__="SolicitudPrestamo"

    idSolicitudPrestamo=Column(Integer, primary_key=True)
    idLibro=Column(Integer, ForeignKey("Libro.idLibro"))
    nombreSolicitante=Column(String)
    apellidoSolicitante=Column(String)
    telefono=Column(String)
    fechaSolicitud=Column(Date)
   