# Clinical Ops Backend Architecture

## Layering

This backend follows a simple layered Laravel structure:

- HTTP layer: `app/Http/Controllers/Api` and `app/Http/Requests`
- Application layer: `app/Services`
- Domain persistence layer: `app/Models`
- Data definition layer: `database/migrations`
- Route boundary: `routes/api.php`

Controllers only validate input and shape JSON responses. Services own workflow transactions. Models hold table mapping, UUID configuration, soft deletes, casts, and relations.

## MVP API

- `POST /api/pendaftaran/pasien`
- `POST /api/poliklinik/anamnesa`
- `POST /api/farmasi/resep/{resepId}/validasi`
- `POST /api/kasir/tagihan/{tagihanId}/bayar`

## PRD Rules Covered

- UUID primary keys via Laravel `HasUuids`
- PostgreSQL-ready `jsonb` fields
- soft deletes for medical records
- indexed NIK, status, kode poli, ICD-10, and kode obat fields
- service-level `DB::transaction()`
- pharmacy and cashier pessimistic locking via `lockForUpdate()`
- decimal billing snapshots instead of mutable master prices
- eager loading-ready Eloquent relations

## Runtime Notes

`.env.example` targets PostgreSQL for real use. Test runs use in-memory SQLite through `phpunit.xml` for fast automated verification.
