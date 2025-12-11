# System Design — MODEX Ticket Booking System

## Overview

This backend provides core APIs for a ticket/slot booking system:

- Admin can create shows/trips (with total seats).
- Seats are auto-generated for shows with total seats.
- Users can list shows, view seat layout, and book seats.

Tech stack:

- Node.js + Express
- PostgreSQL (Supabase)
- Deployment: Render / Railway (recommended)

## High-level architecture

Client (React) ↔ Backend (Express API) ↔ PostgreSQL (Supabase)
Optional: Redis for caching, BullMQ for background jobs.

## Key components

- `routes/` — HTTP routes (admin, user, bookings).
- `controllers/` — Accept requests, validate, call services.
- `services/` — Business logic, DB queries (single responsibility).
- `config/db.js` — Postgres connection via `pg` Pool.
- `utils/errorHandler.js` — Global error middleware.

## Database schema

- `shows(id, name, type, start_time, total_seats, created_at)`
- `seats(id, show_id, seat_number, is_booked, created_at)`
- `bookings(id, show_id, user_id, seats int[], status, created_at)`

## Concurrency control (prevents overbooking)

Primary strategy: **Postgres row-level locks (SELECT ... FOR UPDATE)** inside a transaction.

Booking flow:

1. `BEGIN`
2. `SELECT ... FOR UPDATE` on required seat rows (locks them).
3. Verify all seats are free.
4. `UPDATE seats SET is_booked = true`
5. `INSERT INTO bookings ... status = CONFIRMED`
6. `COMMIT`  
   If any check fails → `ROLLBACK`.

This ensures atomicity and prevents race conditions even under concurrent requests.

## Booking expiry (optional)

- New bookings created as `PENDING`.
- A worker (cron or BullMQ) checks and marks `PENDING` older than 2 minutes as `FAILED`.
- Alternatively use database scheduled job or background worker service.

## Scaling notes

- Database scaling: read replicas, partitioning/sharding if needed, connection pooling.
- Use a shared DB pool (pg Pool) and keep queries optimized (indexes on `seats(show_id, is_booked)`).
- Use Redis for caching frequently read data (shows list).
- Use a message queue (BullMQ/RabbitMQ) to decouple long running tasks (email, expiry jobs).

## Deployment

1. Create Supabase DB and run schema SQL (already included).
2. Deploy backend to Render/Railway:
   - Set environment variable `DATABASE_URL` on host.
   - Build/start commands: `npm install` then `npm start`.
3. Deploy frontend to Vercel and set `VITE_API_URL` to backend URL.

## Security & notes

- Never commit `.env` with real credentials.
- Store secrets in host environment variables.
- Validate user input (currently basic checks exist).
- Add rate-limiting/auth for production.
