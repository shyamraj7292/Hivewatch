from datetime import datetime
from typing import Any, Dict, Optional
from uuid import UUID

from pydantic import BaseModel, Field


class EventBase(BaseModel):
    device_id: UUID
    timestamp: Optional[datetime] = None
    src_ip: str
    src_port: Optional[int] = None
    protocol: Optional[str] = "http"
    method: Optional[str] = None
    path: Optional[str] = None
    headers: Optional[Dict[str, Any]] = None
    body: Optional[str] = None
    raw: Optional[Dict[str, Any]] = None
    severity: int = Field(default=0, ge=0)


class EventCreate(EventBase):
    pass


class EventRead(EventBase):
    id: UUID

    class Config:
        orm_mode = True


