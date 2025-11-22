from pydantic import BaseModel

class demografia(BaseModel):
    ingresos: str
    edad: str
    densitat: str
    activitat_economica: str