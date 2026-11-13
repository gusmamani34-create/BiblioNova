
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

# Cargar las variables de entorno
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# Crear el motor de conexion
engine = create_engine(DATABASE_URL)

# Crear la fabrica de sesiones
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Crear la clase base para los modelos ORM
Base = declarative_base()

# Inyector de sesiones
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()
