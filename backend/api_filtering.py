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
        if filters.get(feature):  
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

    try:
        with open(data_file, "r", encoding="utf-8") as f:
            data = json.load(f)
    except FileNotFoundError:
        print(f"Error: No se encontró {data_file}")
        return []

    elements = data.get("elements", [])
    
    
    try:
        crime_db = pd.read_csv(crime_file).sample(n=500) # limitamos las comparaciones
        
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
from config import API_REAL_STATE_KEY
API_KEY = API_REAL_STATE_KEY
BASE_URL = "https://api.rentcast.io/v1/property/comparables"

def parse_price_range(price_str):
    """Convierte '500000 - 900000' a min y max como enteros."""
    try:
        min_str, max_str = price_str.split("-")
        price_min = int(min_str.replace(",","").strip())
        price_max = int(max_str.replace(",","").strip())
        return price_min, price_max
    except:
        return None, None
    
def prepare_and_filter(input_json="clean_security.json",
                       output_json="final_target_locations.json",
                       max_radius=2,
                       preview=True, 
                       price_range= None,
                       tipo = None #casa/depa
                       ):

    # 1. Verificar archivo
    if not os.path.exists(input_json):
        print(f" Error: No se encuentra el archivo {input_json}")
        return

    # 2. Cargar JSON limpio
    with open(input_json, "r", encoding="utf-8") as f:
        loaded = json.load(f)

    # 3. Detectar estructura
    if isinstance(loaded, dict) and "elements" in loaded:
        data = loaded["elements"]
    elif isinstance(loaded, list):
        data = loaded
    else:
        print("Formato desconocido en JSON, no se puede procesar.")
        return

    print(f"Procesando {len(data)} elementos...")

    barrios_filtrados = []
    preview_list = []

    seen_preview = set()
    seen_final = set()

    for item in data:

        # Extraer nombre desde tags
        name = item.get("name") or item.get("tags", {}).get("name")
        lat = item.get("lat")
        lon = item.get("lon")

        if not all([name, lat, lon]):
            continue

        # Clave única
        key = (name, float(lat), float(lon))

    
        if len(preview_list) < 5 and key not in seen_preview:
            preview_list.append({"name": name, "lat": lat, "lon": lon})
            seen_preview.add(key)

        # Si no es vivienda, no lo agregamos al JSON final, pero sí puede aparecer en preview
        if not price_range or not tipo:
            continue

        # Parseo de rango
        price_min, price_max = parse_price_range(price_range)
        if price_min is None:
            continue

        tipo = str(tipo).lower()
        if tipo == "casa":
            propertyType = "Single Family"
        elif tipo == "departamento":
            propertyType = "Condo"
        else:
            continue

        params = {
            "latitude": lat,
            "longitude": lon,
            "propertyType": propertyType,
            "maxRadius": max_radius,
            "lookupSubjectAttributes": False
        }
        headers = {"Authorization": f"Bearer {API_KEY}"}

        try:
            resp = requests.get(BASE_URL, params=params, headers=headers).json()
            comps = resp.get("comparables", [])
            precios = [p["estimatedValue"] for p in comps if "estimatedValue" in p]

            if not precios:
                continue

            precio_promedio = sum(precios) / len(precios)

            # FILTRO DE PRECIO
            if price_min <= precio_promedio <= price_max:

                if key not in seen_final:
                    barrios_filtrados.append({
                        "name": name,
                        "latitude": lat,
                        "longitude": lon,
                        "price_avg_api": precio_promedio,
                        "price_min_input": price_min,
                        "price_max_input": price_max,
                        "propertyType": propertyType
                    })
                    seen_final.add(key)

        except Exception as e:
            print(f"Error en API para {name}: {e}")
            continue

    # Guardar resultado final
    with open(output_json, "w", encoding="utf-8") as f:
        json.dump(barrios_filtrados, f, indent=4, ensure_ascii=False)

    # Mostrar preview
    if preview:   
        print(" Primeros 5 elementos limpios (sin duplicados):")
        for i, elem in enumerate(preview_list, start=1):
            print(f"{i}. {elem}")

    return barrios_filtrados

