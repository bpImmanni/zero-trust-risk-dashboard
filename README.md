# Zero-Trust Risk Dashboard

Full-stack microservice system for **real-time risk scoring** using **FastAPI**, **Angular**, **Redis**, and **Docker Compose**.

## ✨ Features

- Risk scoring API (FastAPI) with `/score` and `/health`
- Angular dashboard to submit events and view computed **risk scores**
- Redis ready for event logging / caching
- Fully containerized; 1-command local spin-up

## 🧱 Stack

- **Frontend:** Angular 18, Standalone Components, HttpClient
- **Backend:** Python 3.12, FastAPI, Uvicorn
- **Data:** Redis 7 (in-memory)
- **Infra:** Docker, Docker Compose, Nginx (serving built Angular app)

## 📂 Repo Structure

├─ docker-compose.yml
└─ extensions/
├─ risk_service/ # FastAPI app (app.py, requirements.txt, Dockerfile)
└─ zt-dashboard/ # Angular app (src/, angular.json, Dockerfile)

## Quickstart

**Prereqs:** Docker Desktop (or Docker Engine)

```bash
# from repo root
docker compose up --build
```

UI: http://localhost:5173

API health: http://localhost:8080/health
→ {"status":"ok"}
