from fastapi import FastAPI
import json
from api_filtering import build_overpass_query, call_overpass, normalize_weights,ponder_characteristics, security_scope, parse_price_range,prepare_and_filter
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



def reord_priority_to_rank(prioritat_list: list):
    
    
    new_prioritys = {
        category: index + 1
        for index, category in enumerate(prioritat_list)
    }
    return new_prioritys




@app.post("/formcomplite")
async def get_form(form: dict):
    # Llegeix les claus de nivell superior enviades pel frontend
    demografia = form["demografia"]
    estatvida = form["vida"]
    seguretat = form["seguretat"]
    habitatge = form["habitatge"]

    movilitat = form["movilitat"]
    prioritat_list = form["prioritat"] # Rep la llista de categories ordenades

    print(habitatge)

    prioritat_rang = reord_priority_to_rank(prioritat_list)

    estatvidaMovilitat = estatvida | movilitat 
    query = build_overpass_query(estatvidaMovilitat)
    
    data = call_overpass(query)

    archivo_data_json = "data.json"

    try:
        with open(archivo_data_json, 'w', encoding='utf-8') as archivo:
            json.dump(data, archivo, indent=4)
    except IOError as e:
        print("Error al escrivir el archivo")


    weights = normalize_weights(prioritat_rang)

    scores = ponder_characteristics(estatvidaMovilitat, data)

    final_scores = {k: scores[k]*weights.get(k,1) for k in scores}

    ranked = sorted(final_scores.items(), key=lambda x: x[1], reverse=True)

    overall_score = sum(final_scores.values())

    security = security_scope(archivo_data_json)

    archivo_security_json = "security.json"

    try:
        with open(archivo_security_json, 'w', encoding='utf-8') as archivo:
            json.dump(security, archivo, indent=4)
    except IOError as e:
        print("Error al escrivir el archivo")

    price_range = habitatge["precios"]
    tipe = habitatge["tipos"]
    print("hola")
    prepare_and_filter(archivo_security_json, price_range=price_range, tipo=tipe)

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