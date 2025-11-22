from fastapi import APIRouter
from pydantic import BaseModel
from ClasesFormularis import FormSeguridad

router = APIRouter(prefix="/seguritat")




@router.post("/")
def catch_form(form: FormSeguridad):
    return form