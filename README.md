# Healthcare Service Application (MVP)

Digitalisasi operasional medis harian dengan integrasi data seluruh unit.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React, Socket.io-client.
- **Backend:** Laravel (API), Eloquent ORM (UUID & JSONB).
- **Realtime:** Node.js, Socket.io, Express.
- **Database:** Supabase PostgreSQL (Tokyo Region).

## Project Structure

- `/src`: React frontend applications.
- `/backend`: Laravel API framework.
- `/realtime`: Node.js Socket.io service for realtime updates.

## Setup Instructions

### 1. Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
# Database is already configured for Supabase in .env
php artisan migrate
php artisan db:seed
php artisan serve
```

### 2. Realtime Service (Node.js)

```bash
cd realtime
npm install
node index.js
```

### 3. Frontend (React)

```bash
npm install
npm run dev
```

## Features Implemented (Phase 1)

- **Pendaftaran:** Patient registration with UUID and JSONB medical history.
- **Plasma Antrian:** Realtime queue numbering and status updates via Socket.io.
- **Poliklinik:** Medical records (Anamnesa) with ICD-10 codes and electronic prescriptions.
- **Farmasi:** Prescription validation and automatic stock deduction.
- **Kasir:** Precision billing and payment processing.

## Realtime Workflow

1. Laravel triggers a broadcast event to `http://localhost:3000/broadcast`.
2. Node.js server receives the event and emits it to all connected Socket.io clients.
3. Frontend listens for `queue-update` and refreshes data using the API.
