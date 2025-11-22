from fastapi import APIRouter
from pydantic import BaseModel
from ClasesFormularis import FormHabitatge

router = APIRouter(prefix="/habitatges")

@router.post("/")
def catch_form(form: FormHabitatge):
    return form