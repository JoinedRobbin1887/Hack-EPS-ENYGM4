from fastapi import APIRouter
from pydantic import BaseModel
from schemas.forms.FormDemografia import demografia

router = APIRouter(prefix="/demografia")


@router.post("/")
def catch_form(form: demografia):
    return form