#incorporacion de modulos 
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from infraestructura.basededatos.Conexion import Base

class Libro(Base):
    __tablename__="Libro"

    idLibro=Column(Integer, primary_key=True)
    idCategoria=Column(Integer, ForeignKey("Categoria.idCategoria"))
    titulo=Column(String)
    autor=Column(String)
    editoria=Column(String)
    descripcion=Column(Text)
    imagenurl=Column(String)
