from pydantic import BaseModel, field_validator

class Client(BaseModel):
    id: int
    name: str

    """ 
    @field_validator("edad")
    def validate_edad(edad):
        if edad < 1:
            raise ValueError("ahsjdvj")
        return
    """