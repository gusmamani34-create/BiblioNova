#importacion de modulos 
from infraestructura.solicitudprestamo import RepositorioSolicitudPrestamo

def registrarsolicitudprestamoservicio(db, datos_registarsolicitud):
    nuevo_registrosolicitud=RepositorioSolicitudPrestamo.registrarSolicitudPrestamo(
        db,
        datos_registarsolicitud.idLibro,
        datos_registarsolicitud.nombreSolicitante,
        datos_registarsolicitud.apellidoSolicitante,
        datos_registarsolicitud.telefono,
        datos_registarsolicitud.fechaSolicitud
    )

    return nuevo_registrosolicitud

def mostrarsolicitudprestamoservicio(db):
    return RepositorioSolicitudPrestamo.mostrarSolicitudesPrestamo(db)