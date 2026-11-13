#aqui vamos a trabajar con las operaciones sqlalchemy 
from sqlalchemy.orm import Session
from infraestructura.modelos.libro.modelolibro import Libro


def registrarLibro(db:Session,idCategoria, titulo, autor, editoria, descripcion, imagenurl):
    nuevo_libro=Libro(
        idCategoria=idCategoria,
        titulo=titulo,
        autor=autor,
        editoria=editoria,
        descripcion=descripcion,
        imagenurl=imagenurl
    )
    #agrega nuevo objeto a la session de alchemy
    db.add(nuevo_libro)
    db.commit()
    db.refresh(nuevo_libro)

    return nuevo_libro

#mostrar todos los libros
def mostrarLibros(db:Session):
    return db.query(Libro).all()