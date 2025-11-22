from pydantic import BaseModel

class FormDem(BaseModel):
    ingresos: str
    edad: str
    densitat: str
    activitat_economica: str

class FormVida(BaseModel):
    restaurants: bool
    parcs: bool
    diversitat: bool
    gyms: bool
    botigues: bool

class FormMovilitat(BaseModel):
    accesibilitat: bool
    transport_public: bool | str
    carril_bici: bool
    autopistes: bool
    accecibilitat: bool

class FormSeguridad(BaseModel):
    seguretat: bool

class FormHabitatge(BaseModel):
    preus: str
    tipus: str


