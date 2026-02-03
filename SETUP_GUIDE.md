# Archive Platform Setup Guide

Complete guide to set up and run the Archive platform (backend + frontend).

## Prerequisites

- **Go 1.21+** (for backend)
- **Node.js 18+** and **pnpm** (for frontend)
- **PostgreSQL 14+** (database)
- **Redis** (caching)
- **RabbitMQ** (message queue)
- **Docker & Docker Compose** (optional, for containerized setup)

---

## Quick Start (Docker - Recommended)

### 1. Start Backend Services

```bash
cd cortex
make docker-up
```

This will start:
- PostgreSQL (port 5433)
- Redis (port 6379)
- RabbitMQ (port 5672)
- Backend API (port 8080)

### 2. Seed Database

Wait 30 seconds for services to be ready, then:

```bash
make seed-docker
```

This creates default users:
- Admin: `admin@bgce.com` / `Admin@123`
- Editor: `editor@bgce.com` / `Editor@123`
- Viewer: `viewer@bgce.com` / `Viewer@123`

### 3. Create Sample Categories

Login to admin panel and create some categories, or use the API:

```bash
# Get auth token
TOKEN=$(curl -s -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bgce.com","password":"Admin@123"}' \
  | jq -r '.data.token')

# Create a category
curl -X POST http://localhost:8080/api/v1/categories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "label": "Cloud Computing",
    "slug": "cloud-computing",
    "description": "Everything about cloud infrastructure",
    "status": "approved"
  }'
```

### 4. Start Frontend (Archive Client)

```bash
cd archive-client
pnpm install
cp .env.local.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Start Admin Panel

```bash
cd archive-admin
yarn install
cp .env.example .env
yarn dev
```

Open [http://localhost:5173](http://localhost:5173)

Login with: `admin@bgce.com` / `Admin@123`

---

## Local Development Setup (Without Docker)

### 1. Setup PostgreSQL

```bash
# Create database
psql -U postgres -c "CREATE DATABASE cortex_db;"

# Or the database will be created automatically on first run
```

### 2. Setup Redis

```bash
# Install and start Redis
redis-server
```

### 3. Setup RabbitMQ

```bash
# Install and start RabbitMQ
# Default credentials: guest/guest
```

### 4. Configure Backend

```bash
cd cortex
cp .env.example .env
```

Edit `.env`:
```env
BGCE_DB_DSN=postgresql://postgres:root@localhost:5432/cortex_db?sslmode=disable
READ_REDIS_URL=redis://localhost:6379
WRITE_REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://guest:guest@localhost:5672
HTTP_PORT=8080
```

### 5. Run Backend

```bash
# Install dependencies
go mod download

# Run migrations and seed
make seed

# Start server with hot reload
make dev
```

Backend will be available at [http://localhost:8080](http://localhost:8080)

### 6. Setup Frontend

Follow steps 4-5 from Quick Start above.

---

## Testing the Setup

### Test Backend API

```bash
cd archive-client
pnpm test:api
```

Expected output:
```
🔍 Testing API connection...
✅ Health check passed
✅ Categories endpoint working
✅ Subcategories endpoint working
```

### Test Admin Login

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@bgce.com","password":"Admin@123"}'
```

### Test Public Endpoints

```bash
# Get categories (public)
curl http://localhost:8080/api/v1/categories

# Get subcategories (public)
curl http://localhost:8080/api/v1/sub-categories
```

---

## Project Structure

```
archive-platform/
├── cortex/                 # Backend (Go)
│   ├── category/          # Category domain
│   ├── subcategory/       # Subcategory domain
│   ├── user/              # User domain
│   ├── rest/              # HTTP handlers
│   └── ent/               # Database schema
├── archive-admin/         # Admin Panel (Vue.js)
│   ├── src/pages/         # Admin pages
│   ├── src/components/    # UI components
│   └── src/services/      # API services
└── archive-client/        # Public Frontend (Next.js)
    ├── app/               # Next.js pages
    ├── components/        # React components
    └── lib/               # API client
```

---

## Common Issues

### Database Connection Error

**Error**: `database "cortex_db" does not exist`

**Solution**: The database is created automatically. If it fails, create manually:
```bash
psql -U postgres -c "CREATE DATABASE cortex_db;"
```

### Port Already in Use

**Error**: `bind: address already in use`

**Solution**: Change port in `.env` or stop the conflicting service:
```bash
# Find process using port 8080
lsof -i :8080
# Kill it
kill -9 <PID>
```

### CORS Error in Frontend

**Error**: `Access-Control-Allow-Origin`

**Solution**: Backend CORS is already configured. Make sure backend is running on the correct port.

### Categories Not Showing

**Solution**: 
1. Create categories via admin panel
2. Make sure status is "approved"
3. Check API: `curl http://localhost:8080/api/v1/categories`

---

## Development Workflow

### 1. Backend Development

```bash
cd cortex
make dev  # Hot reload with air
```

### 2. Frontend Development

```bash
# Terminal 1: Admin Panel
cd archive-admin
yarn dev

# Terminal 2: Public Client
cd archive-client
pnpm dev
```

### 3. Database Changes

```bash
cd cortex
# Edit schema in ent/schema/
make ent-gen      # Generate code
make db-migrate   # Run migrations
```

---

## API Endpoints

### Public Endpoints (No Auth Required)

- `GET /api/v1/categories` - List all categories
- `GET /api/v1/sub-categories` - List all subcategories
- `GET /api/v1/categories/{uuid}` - Get category by UUID
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration

### Protected Endpoints (Auth Required)

- `POST /api/v1/categories` - Create category
- `PUT /api/v1/categories/{slug}` - Update category
- `DELETE /api/v1/categories/{id}` - Delete category
- `POST /api/v1/sub-categories` - Create subcategory
- `PUT /api/v1/sub-categories/{id}` - Update subcategory
- `DELETE /api/v1/sub-categories/{id}` - Delete subcategory

---

## Environment Variables

### Backend (cortex/.env)

```env
HTTP_PORT=8080
BGCE_DB_DSN=postgresql://postgres:root@localhost:5432/cortex_db?sslmode=disable
READ_REDIS_URL=redis://localhost:6379
WRITE_REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://guest:guest@localhost:5672
JWT_SECRET=your-secret-key-change-in-production
```

### Frontend (archive-client/.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### Admin Panel (archive-admin/.env)

```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

---

## Next Steps

1. ✅ Backend API running
2. ✅ Categories/Subcategories working
3. ✅ Public endpoints accessible
4. 🔄 Create sample categories
5. 🔄 Implement post management
6. 🔄 Add comment system
7. 🔄 Implement search functionality

---

## Useful Commands

```bash
# Backend
make dev              # Run with hot reload
make build            # Build binary
make test             # Run tests
make seed             # Seed database
make docker-up        # Start Docker services
make docker-down      # Stop Docker services

# Frontend (archive-client)
pnpm dev              # Development server
pnpm build            # Production build
pnpm test:api         # Test API connection

# Admin Panel (archive-admin)
yarn dev              # Development server
yarn build            # Production build
yarn preview          # Preview production build
```

---

## Support

For issues or questions:
1. Check logs: `docker compose logs -f` (Docker) or terminal output (local)
2. Verify services are running: `docker compose ps` or `lsof -i :8080`
3. Test API: `pnpm test:api` in archive-client directory
4. Check database: `psql -U postgres -d cortex_db -c "SELECT * FROM categories;"`
