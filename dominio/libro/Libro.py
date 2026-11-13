from pydantic import BaseModel, ConfigDict
from typing import Optional

#creacion de Modelo pydantic
class baseLibro(BaseModel):
    idCategoria: int
    titulo: str
    autor: str
    editoria: str
    descripcion: str
    imagenurl: str

    model_config=ConfigDict(from_attributes=True)

#modelo para regitrar un libro 
class crearLibro(baseLibro):
    pass

#modelo para devolver un libro 
class libroResponse(baseLibro):
    idLibro: int
    estado: str