#incorporacion de modulos 
from infraestructura.categoria import RepositorioCategoria

def registrarcategoriaservicio(
        db, datos_categoria
):
    nueva_categoria=RepositorioCategoria.registrarCategoria(
        db,
        datos_categoria.nombreCategoria
    )
    
    return nueva_categoria

def mostrarCategoriaServicio(db):
    return RepositorioCategoria.mostrarCategorias(db)