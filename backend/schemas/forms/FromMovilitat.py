from pydantic import BaseModel

class movilitat(BaseModel):
    accesibilitatPeu: bool
    transport_public: bool
    carril_bici: bool
    autopistes: bool
    accecibilitat: bool