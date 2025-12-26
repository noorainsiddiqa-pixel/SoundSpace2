from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import requests
import base64
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # for hackathon demo
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID", "b786eba9f87141099615006072a83343")
CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET", "6922aca6b8ce4397b05adc4704e92af1")

REDIRECT_URI = "http://127.0.0.1:8000/callback"

@app.get("/login")
def login():
    scope = "user-top-read user-read-private"
    url = (
        "https://accounts.spotify.com/authorize"
        f"?client_id={CLIENT_ID}"
        "&response_type=code"
        f"&redirect_uri={REDIRECT_URI}"
        f"&scope={scope}"
    )
    return {"url": url}

@app.get("/callback")
def callback(code: str):
    token_url = "https://accounts.spotify.com/api/token"

    auth_header = base64.b64encode(
        f"{CLIENT_ID}:{CLIENT_SECRET}".encode()
    ).decode()

    data = {
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": REDIRECT_URI,
    }

    headers = {
        "Authorization": f"Basic {auth_header}",
        "Content-Type": "application/x-www-form-urlencoded",
    }

    r = requests.post(token_url, data=data, headers=headers)

    return r.json()
