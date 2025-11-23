import os
import json

API_KEY = "TU_API_KEY"
OUTPUT_JSON = "street_view_urls.json"

def generate_street_view_urls(street_name, city_name="Los Angeles"):
    """
    Genera 4 URLs de Street View para una calle.
    """
    location = f"{street_name}"
    if city_name:
        location += f", {city_name}"

    headings = [0, 90, 180, 270]
    urls = []

    for heading in headings:
        url = (
            f"https://maps.googleapis.com/maps/api/streetview"
            f"?size=600x400&location={location}&heading={heading}&key={API_KEY}"
        )
        urls.append(url)
    return urls

urls = generate_street_view_urls(street_name, city_name)

# Guardar URLs en JSON
with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump({"street_name": street_name, "city_name": city_name, "urls": urls}, f, indent=4)

print(f"URLs guardadas en {OUTPUT_JSON}")
