from fastapi import APIRouter
from pydantic import BaseModel
from schemas.forms.FromHabitatge import habitatge

router = APIRouter(prefix="/habitatges")

@router.post("/")
def catch_form(form: habitatge):
    return form