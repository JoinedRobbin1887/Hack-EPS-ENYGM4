from fastapi import FastAPI
from api_filtering import build_overpass_query

app = FastAPI()


def reord_priority_to_rank(prioritat_list: list):
    
    
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

    prioritat_rang = reord_priority_to_rank(prioritat_list)

    estatvidaMovilitat = estatvida | movilitat 
    build_overpass_query(estatvidaMovilitat)

    return [
        {
            "id": 1, 
            "name": "Test Success (Backend Ready)", 
            "score": 10.0, 
            "metrics": [{"key": "Final Priority Order", "value": str(prioritat_rang), "weight": "Crucial"}]
        }
    ]


@app.get("/hola")
def get_results():
    ...