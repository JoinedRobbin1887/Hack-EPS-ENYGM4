from pydantic import BaseModel

class movilitat(BaseModel):
    accesibilitat: bool
    transport_public: bool | str
    carril_bici: bool
    autopistes: bool
    accecibilitat: bool