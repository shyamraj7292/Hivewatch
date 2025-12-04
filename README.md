## HiveWatch

**HiveWatch** is a deception-focused platform for deploying IoT honeypots, collecting telemetry, and visualizing attacker activity in a modern admin dashboard.

### Features

- **Honeypot collector API**: FastAPI-based `/api/events` endpoint for ingesting events from simulated IoT devices.
- **Postgres storage**: Structured tables for `devices`, `events`, and `alerts` (with SQL migrations).
- **Admin dashboard (frontend)**:
  - Secure admin login (frontend scaffolded, ready to wire to real auth).
  - **Global attack map** showing where attacks originate (Leaflet + OpenStreetMap).
  - **Playbooks view** to manage incident response workflows.
- **Docker-ready**: `docker-compose.yml` and `Dockerfile.api` for running the API + DB in containers.

### Tech stack

- **Backend**: Python, FastAPI, SQLAlchemy, Postgres
- **Frontend**: React (Vite + TypeScript), Tailwind CSS, React Router, React Query, React Leaflet
- **Containerization**: Docker / docker compose (or `docker compose` with Docker Desktop)

### Repository structure

- `backend/` – FastAPI app, database models, schemas, migrations, requirements.
- `frontend/` – React admin UI (login, dashboard layout, attack map, playbooks).
- `docker-compose.yml` – Local development stack for API + Postgres.
- `Dockerfile.api` – Backend API container image.

### Getting started

#### 1. Backend (API + Postgres)

If you have Docker and `docker compose`:

```bash
cd Hivewatch-1
docker compose up -d --build
```

This will start:

- Postgres on `localhost:5432`
- FastAPI on `http://localhost:8000`

Apply the initial DB migration if needed:

```bash
psql -h localhost -U hivewatch -d hivewatch -f backend/migrations/001_init.sql
```

You can verify the API is up:

```bash
curl http://localhost:8000/health
```

#### 2. Frontend (admin dashboard)

```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser.

- Login with any email/password (currently mocked to log you in as an admin).
- You’ll see the **Global Attack Map** and can navigate to **Playbooks**.

### Next steps

- Wire frontend login to a real `/api/auth/login` endpoint with JWT + roles.
- Enrich events with IP geolocation in the backend so the map can plot attacker origins.
- Implement real playbook CRUD (`/api/playbooks`) and hook the UI buttons to backend actions.
