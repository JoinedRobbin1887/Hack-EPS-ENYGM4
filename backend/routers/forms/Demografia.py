from fastapi import APIRouter
from pydantic import BaseModel
from ClasesFormularis import FormDem

router = APIRouter(prefix="/demografia")


@router.post("/")
def catch_form(form: FormDem):
    return form