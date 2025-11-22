from pydantic import BaseModel

class vida(BaseModel):
    restaurants: bool
    parcs: bool
    diversitat: bool
    gyms: bool
    botigues: bool