# Docker Images Guide

This document explains how to build, push, and use Docker images for the BGCE Archive project.

## 📦 Available Images

All images are available on GitHub Container Registry (GHCR):

| Service | Image | Port |
|---------|-------|------|
| Archive Admin | `ghcr.io/nesohq/bgce-archive/archive-admin:latest` | 80 |
| Archive Client | `ghcr.io/nesohq/bgce-archive/archive-client:latest` | 3000 |
| Cortex | `ghcr.io/nesohq/bgce-archive/cortex:latest` | 8080 |
| Postal | `ghcr.io/nesohq/bgce-archive/postal:latest` | 8081 |

## 🚀 Quick Start

### Pull and Run Images

```bash
# Archive Admin (Vue.js frontend)
docker pull ghcr.io/nesohq/bgce-archive/archive-admin:latest
docker run -p 5173:80 ghcr.io/nesohq/bgce-archive/archive-admin:latest

# Archive Client (Next.js frontend)
docker pull ghcr.io/nesohq/bgce-archive/archive-client:latest
docker run -p 3000:3000 ghcr.io/nesohq/bgce-archive/archive-client:latest

# Cortex (Go backend - Categories)
docker pull ghcr.io/nesohq/bgce-archive/cortex:latest
docker run -p 8080:8080 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/cortex_db" \
  -e JWT_SECRET="your-secret" \
  ghcr.io/nesohq/bgce-archive/cortex:latest

# Postal (Go backend - Posts)
docker pull ghcr.io/nesohq/bgce-archive/postal:latest
docker run -p 8081:8081 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/cortex_db" \
  -e JWT_SECRET="your-secret" \
  ghcr.io/nesohq/bgce-archive/postal:latest
```

## 🏗️ Building Images Locally

### Build Individual Services

```bash
# Archive Admin
docker build -t archive-admin:local ./archive-admin

# Archive Client
docker build -t archive-client:local ./archive-client

# Cortex
docker build -t cortex:local ./cortex

# Postal
docker build -t postal:local ./postal
```

### Build All Services

```bash
# Using docker-compose
docker-compose build

# Or build individually
for service in archive-admin archive-client cortex postal; do
  docker build -t $service:local ./$service
done
```

## 🔄 CI/CD Pipeline

### Automatic Builds

Images are automatically built and pushed to GHCR when:
- Code is pushed to `master` branch
- A new tag is created (e.g., `v1.0.0`)

### Image Tags

The CI/CD pipeline creates multiple tags:

- `latest` - Latest build from master branch
- `master-<sha>` - Specific commit from master
- `v1.0.0` - Semantic version tags
- `1.0` - Major.minor version
- `1` - Major version only

### Example Workflow

```bash
# Push to master
git push origin master
# → Builds: latest, master-abc1234

# Create a release tag
git tag v1.2.3
git push origin v1.2.3
# → Builds: v1.2.3, 1.2, 1, latest
```

## 🔐 Authentication

### Pull Public Images (No Auth Required)

```bash
docker pull ghcr.io/nesohq/bgce-archive/archive-admin:latest
```

### Push Images (Requires Authentication)

```bash
# Login to GHCR
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Push image
docker push ghcr.io/nesohq/bgce-archive/archive-admin:latest
```

## 🐳 Docker Compose

Create a `docker-compose.yml` for local development:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: cortex_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: root
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  cortex:
    image: ghcr.io/nesohq/bgce-archive/cortex:latest
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgresql://postgres:root@postgres:5432/cortex_db?sslmode=disable
      JWT_SECRET: your-secret-key
      HTTP_PORT: "8080"
    depends_on:
      - postgres

  postal:
    image: ghcr.io/nesohq/bgce-archive/postal:latest
    ports:
      - "8081:8081"
    environment:
      DATABASE_URL: postgresql://postgres:root@postgres:5432/cortex_db?sslmode=disable
      JWT_SECRET: your-secret-key
      HTTP_PORT: "8081"
    depends_on:
      - postgres

  archive-client:
    image: ghcr.io/nesohq/bgce-archive/archive-client:latest
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8080/api/v1
      NEXT_PUBLIC_POSTAL_API_URL: http://localhost:8081/api/v1

  archive-admin:
    image: ghcr.io/nesohq/bgce-archive/archive-admin:latest
    ports:
      - "5173:80"

volumes:
  postgres_data:
```

Run with:
```bash
docker-compose up -d
```

## 📊 Image Optimization

### Multi-stage Builds

All Dockerfiles use multi-stage builds to minimize image size:

- **Builder stage**: Compiles/builds the application
- **Runtime stage**: Only includes necessary runtime dependencies

### Build Cache

The CI/CD pipeline uses GitHub Actions cache to speed up builds:

```yaml
cache-from: type=gha
cache-to: type=gha,mode=max
```

### Multi-platform Support

Images are built for multiple architectures:
- `linux/amd64` (x86_64)
- `linux/arm64` (ARM64/Apple Silicon)

## 🔍 Inspecting Images

```bash
# View image details
docker inspect ghcr.io/nesohq/bgce-archive/cortex:latest

# View image layers
docker history ghcr.io/nesohq/bgce-archive/cortex:latest

# Check image size
docker images ghcr.io/nesohq/bgce-archive/*
```

## 🛠️ Troubleshooting

### Image Pull Fails

```bash
# Check if you're logged in
docker login ghcr.io

# Try pulling with full path
docker pull ghcr.io/nesohq/bgce-archive/cortex:latest
```

### Container Won't Start

```bash
# Check logs
docker logs <container-id>

# Run interactively
docker run -it ghcr.io/nesohq/bgce-archive/cortex:latest sh
```

### Build Fails

```bash
# Clear build cache
docker builder prune -a

# Build without cache
docker build --no-cache -t cortex:local ./cortex
```

## 📝 Best Practices

1. **Use specific tags in production** - Don't use `latest` in production
2. **Pin base image versions** - Use specific versions like `node:20-alpine`
3. **Minimize layers** - Combine RUN commands where possible
4. **Use .dockerignore** - Exclude unnecessary files from build context
5. **Security scanning** - Regularly scan images for vulnerabilities
6. **Health checks** - Add HEALTHCHECK instructions to Dockerfiles

## 🔗 Related Documentation

- [GitHub Actions Workflow](.github/workflows/build-and-push.yml)
- [GHCR Documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
