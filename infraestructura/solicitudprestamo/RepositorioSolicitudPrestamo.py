#inclucion de modulos 
from sqlalchemy.orm import Session
from infraestructura.modelos.solicitudPrestamo.modeloSolicitudPrestamo import SolicitudPrestamo

#registrar una solicitud de prestamo
def registrarSolicitudPrestamo(db:Session, idLibro,nombreSolicitante,
    apellidoSolicitante,telefono,fechaSolicitud):
    #creacion de un objeto nuevo 
    nueva_solicitudprestamo=SolicitudPrestamo(
        idLibro=idLibro,
        nombreSolicitante=nombreSolicitante,
        apellidoSolicitante=apellidoSolicitante,
        telefono=telefono,
        fechaSolicitud=fechaSolicitud
    )

    #añadir el objeto nuevo a sesion sqlalchemy
    db.add(nueva_solicitudprestamo)
    #confirmar transaccion
    db.commit()
    #actualizacion de los datos
    db.refresh(nueva_solicitudprestamo)
    
    return nueva_solicitudprestamo

#mostrar todas las solicitudes de prestamo
def mostrarSolicitudesPrestamo(db:Session):
    return db.query(SolicitudPrestamo).all()