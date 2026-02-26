# Postal Service - Domain-Driven Design Architecture

## Overvie w

The Postal service manages blog posts with proper domain-driven design (DDD) principles, following the skeleton template architecture.

## Architecture Layers

### 1. Domain Layer (`domain/`)
- **Pure business entities** with no external dependencies
- `Post` - Core post entity with business rules
- `PostVersion` - Version history entity
- Domain types and constants (e.g., `PostStatus`)

### 2. Application Layer (`post/`, `post_version/`)
Each bounded context contains:
- **`port.go`** - Interfaces (Service, Repository, Cache)
- **`service.go`** - Business logic implementation
- **`repository.go`** - Data persistence implementation
- **`dto.go`** - Data transfer objects for API

### 3. Infrastructure Layer
- **`cache/`** - Redis caching implementation
- **`config/`** - Configuration management
- **`repo/`** - Database migrations and utilities

### 4. Presentation Layer (`rest/`)
- **`handlers/`** - HTTP request handlers
- **`middlewares/`** - Authentication, logging, CORS
- **`server.go`** - HTTP server setup
- **`utils/`** - Validation and utilities

## Key DDD Principles Applied

### Ports and Adapters (Hexagonal Architecture)
```
Domain (Core) ← Port (Interface) ← Adapter (Implementation)
```

Example:
- **Port**: `post.Repository` interface in `post/port.go`
- **Adapter**: `repository` struct in `post/repository.go`

### Dependency Inversion
- High-level modules (service) depend on abstractions (interfaces)
- Low-level modules (repository) implement those abstractions
- Dependencies flow inward toward the domain

### Separation of Concerns
- **Domain**: Business rules and entities
- **Service**: Use cases and orchestration
- **Repository**: Data access
- **Cache**: Performance optimization
- **Handlers**: HTTP/REST concerns

## Package Structure

```
postal/
├── domain/              # Pure domain entities
│   ├── post.go
│   └── post_version.go
├── post/                # Post bounded context
│   ├── port.go         # Interfaces (Service, Repository, Cache)
│   ├── service.go      # Business logic
│   ├── repository.go   # GORM implementation
│   └── dto.go          # API contracts
├── post_version/        # Version bounded context
│   ├── port.go         # Repository interface
│   └── repository.go   # GORM implementation
├── cache/               # Caching infrastructure
│   ├── client.go
│   └── post_cache.go   # Implements post.Cache
├── rest/                # HTTP layer
│   ├── handlers/
│   ├── middlewares/
│   └── server.go
└── cmd/                 # Application entry points
    ├── root.go
    └── rest.go
```

## Benefits of This Architecture

1. **Testability**: Easy to mock interfaces for unit testing
2. **Maintainability**: Clear separation makes changes isolated
3. **Flexibility**: Can swap implementations (e.g., Redis → Memcached)
4. **Scalability**: Bounded contexts can become microservices
5. **Clean Dependencies**: No circular dependencies, clear flow

## Comparison with Skeleton Template

| Aspect | Skeleton | Postal (Now) |
|--------|----------|--------------|
| Port/Adapter | ✅ Yes | ✅ Yes |
| Bounded Contexts | ✅ Yes | ✅ Yes (post, post_version) |
| Interface Segregation | ✅ Yes | ✅ Yes (port.go files) |
| Read/Write DB Split | ✅ Yes | ⚠️ Future enhancement |
| Repository Pattern | ✅ Yes | ✅ Yes |
| Service Layer | ✅ Yes | ✅ Yes |

## Future Enhancements

1. **Read/Write DB Separation**: Like skeleton template
2. **Query Builder**: Use squirrel for complex queries
3. **Event Sourcing**: Publish domain events to RabbitMQ
4. **CQRS**: Separate read and write models

## Development Guidelines

### Adding a New Feature

1. **Define domain entity** in `domain/`
2. **Create bounded context** folder (e.g., `comment/`)
3. **Define ports** in `port.go` (interfaces)
4. **Implement service** in `service.go`
5. **Implement repository** in `repository.go`
6. **Add DTOs** in `dto.go`
7. **Create handlers** in `rest/handlers/`
8. **Wire dependencies** in `cmd/rest.go`

### Testing Strategy

- **Unit tests**: Mock interfaces from `port.go`
- **Integration tests**: Use test database
- **E2E tests**: Full HTTP stack

## References

- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [Hexagonal Architecture](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
