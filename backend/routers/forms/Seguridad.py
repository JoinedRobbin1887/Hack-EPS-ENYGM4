from fastapi import APIRouter
from pydantic import BaseModel
from schemas.forms.FormSeguretat import seguridad

router = APIRouter(prefix="/seguritat")




@router.post("/")
def catch_form(form: seguridad):
    return form