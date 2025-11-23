import requests
import pandas as pd
import os
import json
import csv


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
        if filters.get(feature):   # <-- evita error si un filtro es None
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
def call_overpass(query, output_file="overpass_response.json"):
    if not query:
        return None

    url = "https://overpass-api.de/api/interpreter"
    response = requests.post(url, data={"data": query})
    
    if response.status_code != 200:
        print("Error en la API:", response.status_code)
        return None

    data = response.json()

    # Guardar en JSON
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    return data


#2- PONDERAR LAS CARACTERÍSTICAS 
#Haremos un rango normalizado desde 0.2 - 1.0 

def normalize_weights(user_priority:dict, min_w=0.2, max_w=1.0): #obtenemos los pesos por prioridades
    min_p = min(user_priority.values())
    max_p = max(user_priority.values())

    weights = {}
    for key, p in user_priority.items():
        norm = (p - min_p) / (max_p - min_p) #recorremos cada prioridad y lo ponemos entre un rango entre 0-1
        weights[key] = min_w + norm * (max_w - min_w)

    return weights #diccionario de pesos numericos listo para multiplicar scores ej prioridad 1= 0.2


def ponder_characteristics(filters: dict, data):
    scores = {k: 0 for k in filters.keys()}

    if not data:
        return scores

    elements = data.get("elements", [])

    for k, enabled in filters.items():
        if enabled:
            scores[k] += 1 #si es true sumamos
            related = sum(1 for e in elements if k in str(e))
            scores[k] += min(related, 5) 

    return scores

# 3- REDUCIMOS EL SCOPE - CON CARACTERISTICAS MÁS ESPECIFICAS ------------ SEGURIDAD --------------

def security_scope(
    data_file="overpass_response.json",
    crime_file="security_db_scope.csv",
    threshold=1,
    output_file="clean_security.json"
):
    print("--- Iniciando Filtro de Seguridad ---")

    # 1. Cargar JSON de Overpass
    try:
        with open(data_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: No se encontró {data_file}")
        return []

    elements = data.get("elements", [])
    
    # 2. Cargar y Limpiar Dataset de Crímenes
    try:
        crime_db = pd.read_csv(crime_file).sample(n=5000) # limitamos las comparaciones
        
        # LIMPIEZA DE DATOS CRÍTICOS:
        # Convertimos la columna LOCATION a string y luego a MAYÚSCULAS
        # .fillna('') evita errores si hay celdas vacías
        crime_db["LOCATION"] = crime_db["LOCATION"].astype(str).fillna('').str.upper()
        
        print(f"Base de datos de crímenes cargada: {len(crime_db)} registros.")
        
    except FileNotFoundError:
        print("Error: No se encontró el CSV de crímenes. Se asume todo como seguro.")
        crime_db = pd.DataFrame() # DataFrame vacío

    filtered = [] 

    print(f"Procesando {len(elements)} elementos de OSM...")

    for i, elem in enumerate(elements):
        tags = elem.get("tags", {})
        original_name = tags.get("name")

        if not original_name:
            filtered.append(elem)
            continue

        # 1. Normalizamos el nombre del POI a mayúsculas para coincidir con el CSV --- TENEMOS LA DTB CON ESTE FORMATO
        name_upper = str(original_name).upper()

        if not crime_db.empty:

            matches = crime_db[crime_db["LOCATION"].str.contains(name_upper, regex=False)]
            crime_freq = len(matches)
        else:
            crime_freq = 0

        #DEBUGGING
        if crime_freq > threshold:
            print(f"  [ELIMINADO] {original_name} (Menciones en crímenes: {crime_freq})")
        
        # 3. Filtrar según el umbral
        if crime_freq <= threshold:
            filtered.append(elem)

    print(f"--- Resultado Final ---")
    print(f"Elementos originales: {len(elements)}")
    print(f"Elementos filtrados (seguros): {len(filtered)}")

    # Guardar JSON
    data["elements"] = filtered
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4, ensure_ascii=False)

    return filtered

# 4 FILTRO ---- REDUCIMOS SCOPE CAMPO - HABITATGE

########################## TESTING AND DEBUGGING ##########################

user_priority = {
    "estilo_de_vida": 1,  
    "movilidad": 3,
    "vivienda": 2,
    "habitatge": 5,
    "Securitat": 2
}

user_filters = {
    "restaurants": True,
    "parks": True,
    "cultural": False,
    "gyms": True,
    "shops": False,   
    "sidewalks": True,
    "public_transport": True,
    "accessibility": True
}

city = "Los Angeles"

query = build_overpass_query(user_filters, city)
data = call_overpass(query)

print("Query generada:")
print(query)

if data and "elements" in data:
    print("\nPrimeros 3 elementos encontrados:")
    for i, elem in enumerate(data["elements"][:3], start=1):
        print(f"{i}: {elem}")
else:
    print("No hay datos o fallo en la API.")

weights = normalize_weights(user_priority)
print("\nPesos normalizados según prioridades:")
print(weights)

scores = ponder_characteristics(user_filters, data)
print("\nScores crudos por característica:")
print(scores)

final_scores = {k: scores[k]*weights.get(k,1) for k in scores}
print("\nScores ponderados por prioridad del usuario:")
print(final_scores)

ranked = sorted(final_scores.items(), key=lambda x: x[1], reverse=True)
print("\nRanking de características según el barrio:")
for cat, score in ranked:
    print(f"{cat}: {score}")

overall_score = sum(final_scores.values())
print("\nScore total de la ciudad:", overall_score)

# Llamar si quieres el filtro de seguridad
security_scope()
