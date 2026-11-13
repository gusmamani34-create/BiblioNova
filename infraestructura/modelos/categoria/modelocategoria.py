#incorporacion de modulos 
from sqlalchemy import Column, Integer, String
from infraestructura.basededatos.Conexion import Base

class Categoria(Base):
    __tablename__ ="Categoria"

    idCategoria=Column(Integer, primary_key=True, index=True)
    nombreCategoria=Column(String)
