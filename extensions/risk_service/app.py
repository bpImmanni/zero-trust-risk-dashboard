from fastapi import FastAPI
from pydantic import BaseModel
import os, time, redis
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Risk Scoring Service", version="0.1.0")

# allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# redis connection
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")
r = redis.Redis.from_url(REDIS_URL, decode_responses=True)

# input model
class LoginEvent(BaseModel):
    user_id: str
    ip: str
    user_agent: str
    failed_attempts_last_24h: int = 0
    geo_distance_km: float = 0.0

# simple rule-based score
def rule_based_score(e: LoginEvent) -> float:
    score = 0.0
    if e.failed_attempts_last_24h > 3:
        score += 0.4
    if e.geo_distance_km > 1000:
        score += 0.3
    if "Headless" in e.user_agent:
        score += 0.2
    if e.ip.startswith("10.") or e.ip.startswith("192.168."):
        score -= 0.1
    return max(0.0, min(1.0, score))

@app.get("/health")
def health():
    try:
        r.ping()
        return {"status": "ok"}
    except Exception as ex:
        return {"status": "degraded", "error": str(ex)}

@app.post("/score")
def score(event: LoginEvent):
    s = rule_based_score(event)
    key = "risk:events"
    r.lpush(key, f"{int(time.time())}|{event.user_id}|{event.ip}|{s:.2f}")
    r.ltrim(key, 0, 9999)
    return {"risk_score": s}
