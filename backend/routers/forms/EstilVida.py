from fastapi import APIRouter
from pydantic import BaseModel
from ClasesFormularis import FormVida

router = APIRouter(prefix="/estilvida")



@router.post("/")
def catch_form(form: FormVida):
    return form