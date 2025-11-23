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


def reord_priority_to_rank(prioritat_list: list):
    """Converteix la llista de prioritat ordenada (index 0 = màx) en un diccionari de rangs (1 = màx)."""
    
    new_prioritys = {
        category: index + 1
        for index, category in enumerate(prioritat_list)
    }
    return new_prioritys


@app.post("/formcomplite")
def get_form(form: dict):
    # Llegeix les claus de nivell superior enviades pel frontend
    demografia = form["demografia"]
    estatvida = form["vida"]
    seguretat = form["seguretat"]
    habitatge = form["habitatge"]
    movilitat = form["movilitat"]
    prioritat_list = form["prioritat"] # Rep la llista de categories ordenades

    # Calcula el diccionari de prioritat amb rangs numèrics (1, 2, 3...)
    prioritat_rang = reord_priority_to_rank(prioritat_list)

    # Dades combinades (per al motor de filtratge)
    estatvidaMovilitat = estatvida | movilitat 

    # RESULTAT DE PROVA: Retorna la prioritat de rang per confirmar que la lògica del backend funciona
    # Quan estigui implementat, això ha de retornar la llista de barris.
    return [
        {
            "id": 1, 
            "name": "Test Success (Backend Ready)", 
            "score": 10.0, 
            "metrics": [{"key": "Final Priority Order", "value": str(prioritat_rang), "weight": "Crucial"}]
        }
    ]