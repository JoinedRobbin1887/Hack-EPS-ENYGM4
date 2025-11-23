from fastapi import FastAPI
from routers.forms import Demografia, EstilVida, Habitatge, Movilitat, Seguridad
from api_filtering import build_overpass_query
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://100.70.184.27",
    "http://localhost",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Routern
app.include_router(Demografia.router)
app.include_router(EstilVida.router)
app.include_router(Habitatge.router)
app.include_router(Movilitat.router)
app.include_router(Seguridad.router)


@app.post("/formcomplite")
def get_form(form: dict):
    demografia= form["demografia"]
    estatvida= form["vida"]
    seguretat= form["seguretat"]
    habitatge= form["habitatge"]
    movilitat= form["movilitat"]
    prioritat= form["prioritat"]

    estatvidaMovilitat = estatvida | movilitat

    print(prioritat)

    new_priority = reord_priority(prioritat)
    #build_overpass_query(estatvidaMovilitat)
    print(new_priority)

    return estatvidaMovilitat



def reord_priority(prioritat: dict):
    
    new_prioritys = {}

    for key, value in prioritat.items():
        new_prioritys[key] = value + 1
    return new_prioritys