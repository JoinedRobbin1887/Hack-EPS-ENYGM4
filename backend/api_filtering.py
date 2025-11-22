import requests


#1 - PRIMERA FILTRACIÓN NO PONDERADA - datos fiables

#Construimos la query según los filtros de la ciudad
def build_overpass_query(filters : dict[str, bool], city : str = "Los Angeles"):

    blocks = []

    query_struct = {
        # --- ESTILO DE VIDA ---
        "restaurants": ['node["amenity"="restaurant"](area.searchArea);'],
        "parks": ['node["leisure"="park"](area.searchArea);'],
        "cultural": ['node["amenity"~"theatre|library|museum"](area.searchArea);'],
        "gyms": [
            'node["leisure"="fitness_centre"](area.searchArea);',
            'node["sport"="fitness"](area.searchArea);'
        ],
        "shops": ['node["shop"](area.searchArea);'],

        # --- MOVILIDAD Y TRANSPORTE ---
        "sidewalks": ['way["sidewalk"="both"](area.searchArea);'],
        "public_transport": [
            'node["bus"="yes"](area.searchArea);',
            'node["train"="yes"](area.searchArea);'
        ],
        "accessibility": [
            'node["wheelchair"="yes"](area.searchArea);',
            'way["wheelchair"="yes"](area.searchArea);',
            'way["sidewalk"](area.searchArea);'
        ]
    }

    for feature, block_list in query_struct.items():
        if filters.get(feature):
            blocks.extend(block_list)

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
    

def ponder_characteristics (data):
    raise NotImplementedError ("No hecho aun")

def sum_scores(data):
    raise NotImplementedError ("No hecho aun")

def best_neighboord(data):
    raise NotImplementedError ("No hecho aun")