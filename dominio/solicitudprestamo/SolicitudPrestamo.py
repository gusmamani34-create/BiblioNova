from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import date

#creacion de modelo pydantic
class baseSolicitudPrestamo(BaseModel):
    idLibro: int 
    nombreSolicitante: str
    apellidoSolicitante: str
    telefono: str
    fechaSolicitud: date

    model_config=ConfigDict(from_attributes=True)

#modelo para registrar una solicitud de prestamos
class crearSolicitudPrestamo(baseSolicitudPrestamo):
    pass

#modelo para devolver una solicitud de prestamo
class solicitudPrestamoResponse(baseSolicitudPrestamo):
    idSolicitudPrestamo: int