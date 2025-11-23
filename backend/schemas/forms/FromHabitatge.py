from pydantic import BaseModel

class habitatge(BaseModel):
    preus: str
    tipus: str