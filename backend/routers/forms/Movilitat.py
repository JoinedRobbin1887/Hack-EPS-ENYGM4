from fastapi import APIRouter
from pydantic import BaseModel
from ClasesFormularis import FormMovilitat

router = APIRouter(prefix="/movilitat")




@router.post("/")
def catch_form(form: FormMovilitat):
    return form