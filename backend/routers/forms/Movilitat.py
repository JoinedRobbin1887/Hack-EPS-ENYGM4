from fastapi import APIRouter
from pydantic import BaseModel
from schemas.forms.FromMovilitat import movilitat

router = APIRouter(prefix="/movilitat")




@router.post("/")
def catch_form(form: movilitat):
    return form