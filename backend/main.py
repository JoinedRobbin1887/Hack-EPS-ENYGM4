from fastapi import FastAPI
from routers.forms import Demografia, EstilVida, Habitatge, Movilitat, Seguridad

app = FastAPI()

# Routern
app.include_router(Demografia.router)
app.include_router(EstilVida.router)
app.include_router(Habitatge.router)
app.include_router(Movilitat.router)
app.include_router(Seguridad.router)

