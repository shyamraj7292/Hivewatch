from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from . import models, schemas
from .database import Base, engine, get_db

Base.metadata.create_all(bind=engine)

app = FastAPI(title="HiveWatch Collector API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/events", response_model=schemas.EventRead)
def ingest_event(event_in: schemas.EventCreate, db: Session = Depends(get_db)):
    """
    Ingest a single honeypot event.
    """
    db_event = models.Event(**event_in.dict())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event


@app.get("/health")
def health_check():
    return {"status": "ok"}


