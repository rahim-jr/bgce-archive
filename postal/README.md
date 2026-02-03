# Postal - Archive Posts Microservice

A Content Management Service for structured knowledge posts under categories and subcategories. Admin-driven, clean, and focused on archive-quality content.

## Features

### Core Functionality
- ✅ **Post CRUD** - Create, Read, Update, Delete posts
- ✅ **Status Management** - Draft → Published → Archived → Deleted
- ✅ **Category Binding** - Organize posts under categories and subcategories
- ✅ **Slug Management** - Auto-generation and manual override
- ✅ **Version History** - Track edits and restore previous versions
- ✅ **SEO Metadata** - Meta title, description, OG image, keywords
- ✅ **Visibility Controls** - Public/Private, Featured, Pinned
- ✅ **Audit Logs** - Track who created, edited, published, deleted

### Post Lifecycle
```
DRAFT → PUBLISHED → ARCHIVED → DELETED
  ↑         ↓
  └─────────┘ (Edit)
```

## Tech Stack

- **Language**: Go 1.21+
- **Framework**: Chi Router
- **ORM**: GORM
- **Database**: PostgreSQL
- **Cache**: Redis
- **Message Queue**: RabbitMQ
- **Monitoring**: Elastic APM (optional)

## Project Structure

```
postal/
├── cmd/                    # CLI commands
│   ├── root.go
│   └── rest.go
├── config/                 # Configuration
│   ├── config.go
│   ├── load-config.go
│   └── db_config.go
├── post/                   # Post domain
│   ├── model.go
│   ├── dto.go
│   ├── repository.go
│   └── service.go
├── post_version/           # Version history
│   ├── model.go
│   └── repository.go
├── rest/                   # HTTP layer
│   ├── handlers/
│   ├── middlewares/
│   └── server.go
├── repo/                   # Database utilities
│   └── migrate.go
├── util/                   # Utilities
│   └── slug.go
├── main.go
├── Makefile
└── README.md
```

## Getting Started

### Prerequisites

- Go 1.21+
- PostgreSQL 14+
- Redis (optional)
- RabbitMQ (optional)

### Installation

1. Clone the repository
```bash
cd postal
```

2. Copy environment file
```bash
cp .env.example .env
```

3. Update `.env` with your configuration
```env
POSTAL_DB_DSN=postgresql://postgres:root@localhost:5433/postal_db?sslmode=disable
HTTP_PORT=8081
JWT_SECRET=your-secret-key
```

4. Install dependencies
```bash
go mod tidy
```

5. Run the service
```bash
make run
```

The service will be available at `http://localhost:8081`

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/posts` | List all published posts |
| GET | `/api/v1/posts/{id}` | Get post by ID |
| GET | `/api/v1/posts/slug/{slug}` | Get post by slug |
| GET | `/api/v1/health` | Health check |

### Protected Endpoints (Admin Only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/posts` | Create new post |
| PUT | `/api/v1/posts/{id}` | Update post |
| POST | `/api/v1/posts/{id}/publish` | Publish post |
| POST | `/api/v1/posts/{id}/unpublish` | Unpublish post |
| POST | `/api/v1/posts/{id}/archive` | Archive post |
| DELETE | `/api/v1/posts/{id}` | Delete post (soft) |

## API Examples

### Create Post
```bash
curl -X POST http://localhost:8081/api/v1/posts \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Getting Started with Go",
    "slug": "getting-started-with-go",
    "summary": "A comprehensive guide to Go programming",
    "content": "# Introduction\n\nGo is a statically typed...",
    "category_id": 1,
    "meta_title": "Getting Started with Go - Complete Guide",
    "meta_description": "Learn Go programming from scratch",
    "keywords": "go, golang, programming, tutorial"
  }'
```

### List Posts
```bash
curl http://localhost:8081/api/v1/posts?limit=10&offset=0&status=published
```

### Get Post by Slug
```bash
curl http://localhost:8081/api/v1/posts/slug/getting-started-with-go
```

### Publish Post
```bash
curl -X POST http://localhost:8081/api/v1/posts/1/publish \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Database Schema

### Posts Table
```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    uuid UUID UNIQUE NOT NULL,
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) UNIQUE NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    thumbnail_url VARCHAR(500),
    category_id INTEGER NOT NULL,
    sub_category_id INTEGER,
    meta_title VARCHAR(500),
    meta_description TEXT,
    keywords TEXT,
    og_image VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'draft',
    is_public BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    is_pinned BOOLEAN DEFAULT false,
    published_at TIMESTAMP,
    archived_at TIMESTAMP,
    created_by INTEGER NOT NULL,
    updated_by INTEGER,
    view_count INTEGER DEFAULT 0,
    version INTEGER DEFAULT 1,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP
);
```

### Post Versions Table
```sql
CREATE TABLE post_versions (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL,
    version_no INTEGER NOT NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    summary TEXT,
    edited_by INTEGER NOT NULL,
    change_note TEXT,
    created_at TIMESTAMP NOT NULL
);
```

## Development

### Run with hot reload
```bash
# Install air
go install github.com/cosmtrek/air@latest

# Run
make dev
```

### Run tests
```bash
make test
```

### Build
```bash
make build
```

## Docker

### Build image
```bash
make docker-build
```

### Run with docker-compose
```bash
make docker-up
```

### Stop services
```bash
make docker-down
```

## Configuration

All configuration is done via environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `SERVICE_NAME` | Service name | postal |
| `HTTP_PORT` | HTTP server port | 8081 |
| `POSTAL_DB_DSN` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `READ_REDIS_URL` | Redis read URL | redis://localhost:6379 |
| `WRITE_REDIS_URL` | Redis write URL | redis://localhost:6379 |
| `RABBITMQ_URL` | RabbitMQ URL | amqp://guest:guest@localhost:5672 |

## Roadmap

- [ ] Full-text search with PostgreSQL
- [ ] Image upload and management
- [ ] PDF attachment support
- [ ] Markdown editor integration
- [ ] SEO sitemap generation
- [ ] RSS feed
- [ ] Post scheduling
- [ ] Multi-language support
- [ ] Analytics integration

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
