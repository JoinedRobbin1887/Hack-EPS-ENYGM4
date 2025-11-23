from fastapi import APIRouter
from pydantic import BaseModel
from schemas.forms.FormEstilVida import vida

router = APIRouter(prefix="/estilvida")



@router.post("/")
def catch_form(form: vida):
    return form