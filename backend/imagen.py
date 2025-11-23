import os
import requests
from config import API_KEY

# -----------------------------
# Configuración
# -----------------------------
API_KEY = API_KEY 
OUTPUT_FOLDER = "street_view_images"
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

# -----------------------------
# Función para generar URLs de Street View
# -----------------------------
def generate_street_view_urls(street_name, city_name=None):
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

# -----------------------------
# Función para descargar imágenes
# -----------------------------
def download_images(urls, folder=OUTPUT_FOLDER):
    for i, url in enumerate(urls):
        response = requests.get(url)
        if response.status_code == 200:
            path = os.path.join(folder, f"street_{i}.jpg")
            with open(path, "wb") as f:
                f.write(response.content)
            print(f"Descargada: {path}")
        else:
            print(f"No se pudo descargar {url}")

# -----------------------------
# EJEMPLO
# -----------------------------
street_name = "Sunset Blvd"
city_name = "Los Angeles"  # opcional

urls = generate_street_view_urls(street_name, city_name)
print("=== URLs de Street View ===")
for u in urls:
    print(u)

# Descargar imágenes
download_images(urls)
