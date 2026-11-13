#incorporacion de modulos 
from sqlalchemy.orm import Session
from infraestructura.modelos.categoria.modelocategoria import Categoria

#registrar nueva cateogia 
def registrarCategoria(db:Session, nombreCategoria):
    #creacion de nuevo objeto 
    nuevacategoria=Categoria(
        nombreCategoria=nombreCategoria
    )

    #añadir nuevo objeto a la sesion de sqlalchemy
    db.add(nuevacategoria)
    #confirmar transacion 
    db.commit()
    #refrescar objeto con los datos nuevos 
    db.refresh(nuevacategoria)

    return nuevacategoria

#mostrar categorias
def mostrarCategorias(db:Session):
    return db.query(Categoria).all()