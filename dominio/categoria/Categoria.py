#incorporacion de modulos
from pydantic import BaseModel, ConfigDict
from typing import Optional

#creacion de modelo pydantic 
class baseCategoria(BaseModel):
    nombreCategoria: str
    model_config=ConfigDict(from_attributes=True)

#modelo para registrar una categoria 
class crearCategoria(baseCategoria):
    pass

#modelo para devolver una categoria 
class categoriaResponse(baseCategoria):
    idCategoria: int