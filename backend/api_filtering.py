import requests


#1 - PRIMERA FILTRACIÓN NO PONDERADA - datos fiables

#Construimos la query según los filtros de la ciudad
def build_overpass_query(filters, city="Los Angeles"):
    
    blocks = []

    # --- ESTILO DE VIDA ---
    if filters.get("restaurants"):
        blocks.append('node["amenity"="restaurant"](area.searchArea);')
    if filters.get("parks"):
        blocks.append('node["leisure"="park"](area.searchArea);')
    if filters.get("cultural"):
        blocks.append('node["amenity"~"theatre|library|museum"](area.searchArea);')
    if filters.get("gyms"):
        blocks.append('node["leisure"="fitness_centre"](area.searchArea);')
        blocks.append('node["sport"="fitness"](area.searchArea);')
    if filters.get("shops"):
        blocks.append('node["shop"](area.searchArea);')

     # --- MOVILIDAD Y TRANSPORTE ---
    if filters.get("sidewalks"):
        blocks.append('way["sidewalk"="both"](area.searchArea);')
    if filters.get("public_transport"):
        blocks.append('node["bus"="yes"](area.searchArea);')
        blocks.append('node["train"="yes"](area.searchArea);')
    if filters.get("accessibility"):
        blocks.append('node["wheelchair"="yes"](area.searchArea);')
        blocks.append('way["wheelchair"="yes"](area.searchArea);')
        blocks.append('way["sidewalk"](area.searchArea);')

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
def call_overpass(query):
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