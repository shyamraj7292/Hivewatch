import uuid
from sqlalchemy import (
    Column,
    String,
    Integer,
    Text,
    JSON,
    ForeignKey,
    DateTime,
)
from sqlalchemy.dialects.postgresql import UUID, INET
from sqlalchemy.sql import func

from .database import Base


class Device(Base):
    __tablename__ = "devices"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    ip = Column(String, nullable=True)
    port = Column(Integer, nullable=True)
    config = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class Event(Base):
    __tablename__ = "events"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    device_id = Column(UUID(as_uuid=True), ForeignKey("devices.id"), nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now(), index=True)
    src_ip = Column(INET, nullable=False)
    src_port = Column(Integer, nullable=True)
    protocol = Column(String, nullable=True)
    method = Column(String, nullable=True)
    path = Column(String, nullable=True, index=True)
    headers = Column(JSON, nullable=True)
    body = Column(Text, nullable=True)
    raw = Column(JSON, nullable=True)
    severity = Column(Integer, nullable=False, default=0)


class Alert(Base):
    __tablename__ = "alerts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    event_id = Column(UUID(as_uuid=True), ForeignKey("events.id"), nullable=False)
    device_id = Column(UUID(as_uuid=True), ForeignKey("devices.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    severity = Column(Integer, nullable=False, default=1)
    description = Column(Text, nullable=False)
    status = Column(String, nullable=False, default="open")
    assignee = Column(String, nullable=True)
    notes = Column(JSON, nullable=True)


