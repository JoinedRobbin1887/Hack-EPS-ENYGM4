import requests
from config import API_KEY_GOOGLE
from config import cx


API_KEY = API_KEY_GOOGLE
CX = cx  # Custom Search Engine ID


def get_images_from_coordinates(lat, lon, n=5):
    query = f"{lat}, {lon} street view neighborhood photo"

    url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": API_KEY,
        "cx": CX,
        "searchType": "image",
        "q": query,
        "num": n
    }

    r = requests.get(url, params=params)
    data = r.json()

    if "items" not in data:
        print("No se encontraron imágenes para este sitio.")
        print(data)  # útil para depurar si algo falla
        return []

    # Devolver solo los links a las imágenes
    return [item["link"] for item in data["items"]]


lat = 34.052235
lon = -118.243683

imagenes = get_images_from_coordinates(lat, lon, n=5)
for img in imagenes:
    print(img)
