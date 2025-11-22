import requests


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


    # Si no hay ningún bloque activo
    if not blocks:
        return None

    # Construir query final
    blocks_joined = "\n        ".join(blocks)
    query = f"""
        [out:json][timeout:50];
        area["name"="{city}"]["boundary"="administrative"]->.searchArea;
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


########################## TESTING AND DEBUGGING ##########################

user_filters = {
    "restaurants": True,
    "parks": True,
    "cultural": False,
    "gyms": True,
    "shops": None,
    "footways": True,
    "sidewalks": True,
    "public_transport": True,
    "cycleways": True,
    "motorways": False,
    "accessibility": True,
    "apartments": True,
    "houses": False
}

city = "Los Angeles"

query = build_overpass_query(user_filters, city)
data = call_overpass(query)

print("Query generada:")
print(query)
print("\nNúmero de elementos encontrados:", len(data["elements"]))
