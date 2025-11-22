import requests


#1 - PRIMERA FILTRACIÓN NO PONDERADA - datos fiables

#Construimos la query según los filtros de la ciudad
def build_overpass_query(filters : dict[str, bool], city : str = "Los Angeles"):

    blocks = []
    
    query_struct = {
        # --- ESTILO DE VIDA ---
        "restaurants": 'node["amenity"="restaurant"](area.searchArea);',
        "parks": 'node["leisure"="park"](area.searchArea);',
        "cultural": 'node["amenity"~"theatre|library|museum"](area.searchArea);',
        "gyms": 'node["leisure"="fitness_centre"](area.searchArea);\n        node["sport"="fitness"](area.searchArea);',
        "shops": 'node["shop"](area.searchArea);',

        # --- MOVILIDAD Y TRANSPORTE ---
        "sidewalks": 'way["sidewalk"="both"](area.searchArea);',
        "public_transport": 'node["bus"="yes"](area.searchArea);\n        node["train"="yes"](area.searchArea);',
        "accessibility": 'node["wheelchair"="yes"](area.searchArea);\n        way["wheelchair"="yes"](area.searchArea);\n        way["sidewalk"](area.searchArea);'
    }

    for feature in query_struct.keys():
        if filters[feature]:
            blocks.append(query_struct[feature])

    # Si no hay ningún bloque activo
    if not blocks:
        return None

    # Construir query final
    blocks_joined = "\n        ".join(blocks)
    query = f"""
        [out:json][timeout:50];
        area["name"="{city}"]->.searchArea;
        (
        {blocks_joined}
        );
        out center;
        """
    return query

#llamamos a la api
def call_overpass(query ):
    if not query:
        return None
    url = "https://overpass-api.de/api/interpreter"
    response = requests.post(url, data={"data": query})
    return response.json()


#2- PONDERAR LAS CARACTERÍSTICAS 
#Haremos un rango normalizado desde 0.2 - 1.0 

def normalize_weights(user_priority, min_w=0.2, max_w=1.0): #obtenemos los pesos por prioridades
    min_p = min(user_priority.values())
    max_p = max(user_priority.values())

    weights = {}
    for key, p in user_priority.items():
        norm = (p - min_p) / (max_p - min_p)
        weights[key] = min_w + norm * (max_w - min_w)

    return weights


def ponder_characteristics(filters: dict, data):
    scores = {k: 0 for k in filters.keys()}

    if not data:
        return scores

    elements = data.get("elements", [])

    for k, enabled in filters.items():
        if enabled:
            scores[k] += 1
            related = sum(1 for e in elements if k in str(e))
            scores[k] += min(related, 5)

    return scores



########################## TESTING AND DEBUGGING ##########################

user_priority= {"estilo_de_vida":1 , "seguridad" :2, "movilidad":3, "vivienda":4, "habitatge":5} 

user_filters = {
    "restaurants": True,
    "parks": True,
    "cultural": False,
    "gyms": True,
    "shops": None,
    "sidewalks": True,
    "public_transport": True,
    "accessibility": True
}

city = "Los Angeles"

query = build_overpass_query(user_filters, city)
data = call_overpass(query)

print("Query generada:")
print(query)
print("\nPrimeros 3 elementos encontrados:")
for i, elem in enumerate(data["elements"][:3], start=1):
    print(f"{i}: {elem}")
    