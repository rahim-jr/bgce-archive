# BGCE Archive - Quick Start Guide

## 🚀 Get Everything Running in 5 Minutes

This monorepo contains three main projects:
- **Cortex**: Backend API (Go + PostgreSQL + Redis + RabbitMQ)
- **Archive-Admin**: Admin Dashboard (Vue 3 + TypeScript)
- **Archive-Client**: Public Client (Next.js + TypeScript)

---

## Prerequisites

- Docker & Docker Compose installed
- Node.js 18+ installed
- Go 1.23+ installed (for local development)
- pnpm or yarn package manager

---

## Quick Start (All Services)

### 1. Start Backend (Cortex)

```bash
cd cortex

# Start all backend services (PostgreSQL, Redis, RabbitMQ, API)
make docker-up

# Wait ~30 seconds for services to be healthy
make docker-logs

# Seed database with test users
make seed-docker
```

**Backend API**: `http://localhost:8080`
**Swagger Docs**: `http://localhost:8080/swagger/`

### 2. Start Admin Dashboard

```bash
cd archive-admin

# Install dependencies (first time only)
yarn install

# Start development server
yarn dev
```

**Admin Dashboard**: `http://localhost:5173` (or check terminal for port)

### 3. Start Public Client (Optional)

```bash
cd archive-client

# Install dependencies (first time only)
pnpm install

# Start development server
pnpm dev
```

**Public Client**: `http://localhost:3000`

---

## 🔑 Default Test Credentials

After seeding, use these credentials to login:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@bgce.com | Admin@123 |
| Editor | editor@bgce.com | Editor@123 |
| Viewer | viewer@bgce.com | Viewer@123 |
| Test User | test@example.com | Test@123 |

See `cortex/SEED_CREDENTIALS.md` for more details.

---

## 🧪 Quick Test

### Test Admin Dashboard
1. Open `http://localhost:5173/login`
2. Login with `admin@bgce.com` / `Admin@123`
3. Navigate to Categories page
4. Test CRUD operations (Create, Edit, Delete)

### Test API Directly
```bash
cd cortex
./test_auth_api.sh
```

This tests:
- ✅ User registration
- ✅ User login
- ✅ Protected routes
- ✅ Category CRUD operations

---

## 📁 Project Structure

```
bgce-archive/
├── cortex/                 # Backend API (Go)
│   ├── auth/              # Authentication logic
│   ├── category/          # Category service
│   ├── user/              # User service
│   ├── rest/              # HTTP handlers
│   └── ent/               # Database ORM
│
├── archive-admin/         # Admin Dashboard (Vue 3)
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── stores/        # Pinia stores
│   │   └── types/         # TypeScript types
│   └── package.json
│
├── archive-client/        # Public Client (Next.js)
│   ├── app/               # App router pages
│   ├── components/        # React components
│   └── package.json
│
└── docs/                  # Documentation
```

---

## 🌐 Service URLs

| Service | URL | Notes |
|---------|-----|-------|
| **Cortex API** | http://localhost:8080 | Backend REST API |
| **Swagger Docs** | http://localhost:8080/swagger/ | API documentation |
| **Admin Dashboard** | http://localhost:5173 | Vue 3 admin panel |
| **Public Client** | http://localhost:3000 | Next.js public site |
| **PostgreSQL** | localhost:5432 | postgres/postgres |
| **Redis** | localhost:6379 | No password |
| **RabbitMQ** | localhost:5672 | admin/admin |
| **RabbitMQ UI** | http://localhost:15672 | admin/admin |

---

## 📋 Common Commands

### Cortex (Backend)

```bash
cd cortex

# Docker commands
make docker-up          # Start all services
make docker-down        # Stop all services
make docker-logs        # View logs
make docker-restart     # Restart services
make docker-clean       # Clean everything

# Database
make seed               # Seed database (local)
make seed-docker        # Seed database (Docker)

# Local development
make dev                # Run with hot reload
make build              # Build binary
make test               # Run tests
```

### Archive-Admin (Vue 3)

```bash
cd archive-admin

yarn dev                # Start dev server
yarn build              # Build for production
yarn preview            # Preview production build
yarn lint               # Lint code
yarn type-check         # Check TypeScript types
```

### Archive-Client (Next.js)

```bash
cd archive-client

pnpm dev                # Start dev server
pnpm build              # Build for production
pnpm start              # Start production server
pnpm lint               # Lint code
```

---

## � Configuration

### Backend Environment (.env)

```bash
cd cortex
cp .env.example .env
```

Key variables:
- `HTTP_PORT=8080` - API server port
- `JWT_SECRET=your-secret-key` - JWT signing key
- `BGCE_DB_DSN=...` - PostgreSQL connection string

### Frontend Environment (.env)

```bash
cd archive-admin
cp .env.example .env
```

Key variables:
- `VITE_API_BASE_URL=http://localhost:8080/api/v1` - Backend API URL

---

## � Troubleshooting

### Backend won't start

```bash
# Check if ports are in use
lsof -i :8080
lsof -i :5432

# Clean and restart
cd cortex
make docker-clean
make docker-up
```

### Frontend can't connect to API

```bash
# Check environment file
cat archive-admin/.env

# Should contain:
# VITE_API_BASE_URL=http://localhost:8080/api/v1

# Restart frontend
cd archive-admin
yarn dev
```

### CORS errors

- Ensure backend is running on port 8080
- Check `VITE_API_BASE_URL` in frontend `.env`
- Clear browser cache and localStorage
- Restart both backend and frontend

### Authentication issues

- Clear browser localStorage
- Login again with seeded credentials
- Check JWT_SECRET in backend `.env`
- Verify token expiration (24 hours default)

### Database migration issues

```bash
cd cortex
make ent-gen            # Regenerate Ent code
make docker-clean       # Clean everything
make docker-up          # Restart services
make seed-docker        # Reseed database
```

---

## 📚 Documentation

### Project Documentation
- `README.md` - Main project overview
- `IMPLEMENTATION_SUMMARY.md` - Complete feature list
- `AUTHENTICATION_IMPLEMENTATION.md` - Auth system details
- `COMPLETE_SUCCESS.md` - All resolved issues

### Cortex (Backend)
- `cortex/README.md` - Backend overview
- `cortex/QUICKSTART.md` - Cortex-specific quickstart
- `cortex/SEEDING.md` - Database seeding guide
- `cortex/SEED_CREDENTIALS.md` - Test user credentials

### Archive-Admin (Frontend)
- `archive-admin/README.md` - Admin dashboard overview

### Archive-Client (Public)
- `archive-client/README.md` - Public client overview

---

## 🎯 Development Workflow

### 1. Backend Development

```bash
cd cortex

# Start services
make docker-up

# Run with hot reload (requires air)
make dev

# Make changes to code
# Changes auto-reload

# Run tests
make test
```

### 2. Frontend Development

```bash
cd archive-admin

# Start dev server
yarn dev

# Make changes to code
# Changes auto-reload with HMR

# Check types
yarn type-check

# Lint code
yarn lint
```

### 3. Full Stack Feature

1. **Backend**: Add API endpoint in `cortex/rest/handlers/`
2. **Backend**: Add route in `cortex/rest/server.go`
3. **Frontend**: Add service method in `archive-admin/src/services/`
4. **Frontend**: Update types in `archive-admin/src/types/api.ts`
5. **Frontend**: Use in components/pages
6. **Test**: Verify end-to-end functionality

---

## ✅ Verification Checklist

- [ ] Backend running on port 8080
- [ ] Admin dashboard running on port 5173
- [ ] Can login to admin dashboard
- [ ] Can view categories list
- [ ] Can create new category
- [ ] Can edit existing category
- [ ] Can delete category
- [ ] Token persists after page refresh
- [ ] Logout works correctly
- [ ] No CORS errors in console
- [ ] No 401 authentication errors

---

## 🚀 Next Steps

### For Developers

1. **Explore the Code**:
   - Backend: Start with `cortex/rest/server.go`
   - Frontend: Start with `archive-admin/src/main.ts`

2. **Read Documentation**:
   - Authentication flow
   - API endpoints
   - Component structure

3. **Add Features**:
   - Follow the development workflow above
   - Test thoroughly
   - Update documentation

### For Users

1. **Login**: Use admin credentials
2. **Explore**: Navigate through the admin dashboard
3. **Test**: Try all CRUD operations
4. **Customize**: Update categories, users, etc.

---

## 💡 Tips

- **Hot Reload**: Both backend (with air) and frontend support hot reload
- **Debugging**: Check browser console and backend logs
- **API Testing**: Use Swagger UI at http://localhost:8080/swagger/
- **Database**: Use TablePlus, pgAdmin, or psql to inspect data
- **Performance**: Backend responses are typically <5ms

---

## 🆘 Need Help?

1. **Check Logs**:
   ```bash
   # Backend logs
   cd cortex && make docker-logs
   
   # Frontend logs
   # Check terminal where yarn dev is running
   ```

2. **Review Documentation**: Check the docs/ folder

3. **Common Issues**: See Troubleshooting section above

4. **Clean Start**:
   ```bash
   # Backend
   cd cortex && make docker-clean && make docker-up && make seed-docker
   
   # Frontend
   cd archive-admin && rm -rf node_modules && yarn install && yarn dev
   ```

---

## 📦 Production Deployment

### Backend (Docker)

```bash
cd cortex
docker build -t cortex-api .
docker run -p 8080:8080 --env-file .env cortex-api
```

### Frontend (Static Build)

```bash
cd archive-admin
yarn build
# Deploy dist/ folder to CDN or static hosting
```

### Environment Variables

Ensure production environment variables are set:
- Update `JWT_SECRET` to a strong random value
- Set proper database credentials
- Configure CORS for production domains
- Enable HTTPS/TLS

---

**Happy Coding! 🎉**

For detailed information about specific components, check the README files in each project directory.
