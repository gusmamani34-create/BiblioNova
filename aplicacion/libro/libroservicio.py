from infraestructura.libro import RepositorioLibro

def registrarlibroservicio(db, datos_libro):
    nuevo_libro = RepositorioLibro.registrarLibro(
        db,
        datos_libro.idCategoria,
        datos_libro.titulo,
        datos_libro.autor,
        datos_libro.editoria,
        datos_libro.descripcion,
        datos_libro.imagenurl
        )

    return nuevo_libro

#mostar libros
def mostrarlibrosservicio(db):
    return RepositorioLibro.mostrarLibros(db)