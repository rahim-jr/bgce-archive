# Postal Service - Clean Architecture

## Architecture Overview

The Postal service follows **Domain-Driven Design (DDD)** and **Clean Architecture** principles, properly separating concerns across layers.

## Directory Structure

```
postal/
├── domain/              # Pure domain entities (no dependencies)
│   ├── post.go
│   └── post_version.go
│
├── post/                # Post bounded context (business logic)
│   ├── port.go         # Service & Repository interfaces
│   ├── svc.go          # Service implementation (constructor)
│   ├── service.go      # Business logic methods
│   └── dto.go          # Data transfer objects
│
├── post_version/        # Version bounded context
│   └── port.go         # Repository interface
│
├── repo/                # Infrastructure - Data persistence
│   ├── migrate.go
│   ├── post_repository.go
│   └── post_version_repository.go
│
├── cache/               # Infrastructure - Generic caching
│   ├── cache.go        # Cache interface & constructor
│   ├── client.go       # Redis client setup
│   ├── set.go          # Set operation
│   ├── get.go          # Get operation
│   ├── del.go          # Delete operation
│   └── key_exists.go   # Exists check
│
├── rest/                # Presentation layer
│   ├── handlers/       # HTTP handlers
│   ├── middlewares/    # Auth, CORS, logging
│   ├── server.go       # HTTP server setup
│   └── utils/          # Validation
│
├── config/              # Configuration management
│   ├── config.go
│   ├── db_config.go
│   └── load-config.go
│
└── cmd/                 # Application entry points
    ├── root.go
    └── rest.go         # Dependency injection & wiring
```

## Layer Responsibilities

### 1. Domain Layer (`domain/`)
**Pure business entities with zero external dependencies**

- Contains only domain models and business rules
- No imports from other layers
- Framework-agnostic
- Example: `Post`, `PostVersion`, `PostStatus`

```go
// domain/post.go
type Post struct {
    ID     uint
    Title  string
    Status PostStatus
    // ... business fields
}
```

### 2. Application Layer (Bounded Contexts)

#### `post/` - Post Bounded Context
- **`port.go`**: Defines interfaces (Service, Repository)
- **`svc.go`**: Service constructor (dependency injection)
- **`service.go`**: Business logic implementation
- **`dto.go`**: API contracts (Request/Response)

```go
// post/port.go
type Service interface {
    CreatePost(ctx, req, userID) (*PostResponse, error)
    // ... other methods
}

type Repository interface {
    Create(ctx, post) error
    // ... other methods
}
```

```go
// post/svc.go
func NewService(repo Repository, versionRepo post_version.Repository, cache cache.Cache) Service {
    return &service{repo, versionRepo, cache}
}
```

**Key Principle**: Service implements caching logic using generic cache primitives

```go
// Service uses cache.Set/Get, NOT cache.SetPost/GetPost
func (s *service) GetPostByID(ctx context.Context, id uint) (*PostResponse, error) {
    // Try cache
    cacheKey := fmt.Sprintf("post:id:%d", id)
    cached, _ := s.cache.Get(ctx, cacheKey)
    if cached != "" {
        // unmarshal and return
    }
    
    // Load from DB
    post, _ := s.repo.GetByID(ctx, id)
    
    // Cache it
    data, _ := json.Marshal(post)
    s.cache.Set(ctx, cacheKey, data, 24*time.Hour)
    
    return ToPostResponse(post), nil
}
```

#### `post_version/` - Version Bounded Context
- **`port.go`**: Repository interface only (no service needed yet)

### 3. Infrastructure Layer

#### `repo/` - Data Persistence
**All repository implementations live here**

- `post_repository.go` - Implements `post.Repository`
- `post_version_repository.go` - Implements `post_version.Repository`
- Uses GORM for database operations
- Handles transactions, queries, migrations

```go
// repo/post_repository.go
type postRepository struct {
    db *gorm.DB
}

func NewPostRepository(db *gorm.DB) post.Repository {
    return &postRepository{db}
}
```

#### `cache/` - Generic Caching
**Provides primitive cache operations, NOT domain-specific methods**

```go
// cache/cache.go
type Cache interface {
    Set(ctx, key, value, expiration) error
    Get(ctx, key) (string, error)
    Del(ctx, keys...) error
    Exists(ctx, keys...) (int64, error)
}
```

**WRONG** ❌:
```go
type Cache interface {
    SetPost(ctx, post) error      // Domain-specific!
    GetPostByID(ctx, id) (*Post, error)  // Domain-specific!
}
```

**RIGHT** ✅:
```go
type Cache interface {
    Set(ctx, key, value, ttl) error      // Generic!
    Get(ctx, key) (string, error)        // Generic!
}
```

### 4. Presentation Layer (`rest/`)
- HTTP handlers
- Request validation
- Response formatting
- Middleware (auth, CORS, logging)

### 5. Configuration (`config/`)
- Environment variables
- Database connection
- Service configuration

### 6. Entry Point (`cmd/`)
**Dependency injection and wiring**

```go
// cmd/rest.go
func runRESTServer() error {
    // 1. Load config
    cfg := config.LoadConfig()
    
    // 2. Initialize infrastructure
    db := config.InitDatabase(cfg)
    redisClient := cache.NewRedisClient(cfg.WriteRedisURL)
    
    // 3. Initialize repositories (adapters)
    postRepo := repo.NewPostRepository(db)
    versionRepo := repo.NewPostVersionRepository(db)
    cacheClient := cache.NewCache(redisClient, redisClient)
    
    // 4. Initialize services (use cases)
    postService := post.NewService(postRepo, versionRepo, cacheClient)
    
    // 5. Initialize handlers (controllers)
    handlers := handlers.NewHandlers(postService, versionRepo, validator)
    
    // 6. Start server
    server := rest.NewServeMux(middlewares, handlers)
    http.ListenAndServe(":"+cfg.HTTPPort, server)
}
```

## Dependency Flow

```
┌─────────────────────────────────────────────────┐
│                   cmd/rest.go                   │
│            (Dependency Injection)               │
└────────────────────┬────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   ┌────────┐  ┌─────────┐  ┌────────┐
   │  REST  │  │ Service │  │  Repo  │
   │Handlers│─▶│  (post) │─▶│  (DB)  │
   └────────┘  └─────────┘  └────────┘
                     │
                     ▼
                ┌────────┐
                │ Cache  │
                │(Redis) │
                └────────┘
```

**Dependencies point INWARD**:
- Handlers depend on Service interface
- Service depends on Repository & Cache interfaces
- Implementations (repo, cache) depend on nothing

## Key Principles Applied

### 1. Separation of Concerns
- **Domain**: Business rules
- **Service**: Use cases & orchestration
- **Repository**: Data access
- **Cache**: Performance optimization
- **Handlers**: HTTP concerns

### 2. Dependency Inversion
```go
// Service depends on interface (port)
type service struct {
    repo Repository  // interface, not concrete type
}

// Repository implementation (adapter)
type postRepository struct {
    db *gorm.DB
}

func NewPostRepository(db *gorm.DB) Repository {  // Returns interface
    return &postRepository{db}
}
```

### 3. Interface Segregation
Each bounded context defines its own interfaces in `port.go`:
- `post.Service` - Business operations
- `post.Repository` - Data operations
- `post_version.Repository` - Version operations

### 4. Single Responsibility
- **Cache layer**: Generic operations only
- **Service layer**: Implements domain-specific caching logic
- **Repository layer**: Database operations only

### 5. Ports and Adapters (Hexagonal Architecture)
```
Application Core (post/)
    ↓ depends on
Ports (interfaces in port.go)
    ↑ implemented by
Adapters (repo/, cache/)
```

## Testing Strategy

### Unit Tests
Mock interfaces from `port.go`:
```go
type mockRepository struct{}
func (m *mockRepository) GetByID(ctx, id) (*domain.Post, error) {
    return &domain.Post{ID: id}, nil
}

func TestGetPostByID(t *testing.T) {
    mockRepo := &mockRepository{}
    mockCache := &mockCache{}
    svc := post.NewService(mockRepo, nil, mockCache)
    
    result, err := svc.GetPostByID(ctx, 1)
    // assertions
}
```

### Integration Tests
Use test database and real implementations

### E2E Tests
Full HTTP stack with test server

## Benefits

1. **Testability**: Easy to mock interfaces
2. **Maintainability**: Clear boundaries, isolated changes
3. **Flexibility**: Swap implementations (GORM → sqlx, Redis → Memcached)
4. **Scalability**: Bounded contexts can become microservices
5. **Clean Dependencies**: No circular dependencies

## Comparison with Skeleton Template

| Aspect | Skeleton | Postal |
|--------|----------|--------|
| Port/Adapter Pattern | ✅ | ✅ |
| Bounded Contexts | ✅ | ✅ |
| Repo in `repo/` | ✅ | ✅ |
| Generic Cache | ✅ | ✅ |
| Service Implements Cache Logic | ✅ | ✅ |
| Interface Segregation | ✅ | ✅ |
| Clean Dependencies | ✅ | ✅ |

## Common Mistakes to Avoid

### ❌ Domain-Specific Cache Methods
```go
// WRONG - Cache knows about Post
type Cache interface {
    SetPost(ctx, post) error
    GetPostByID(ctx, id) (*Post, error)
}
```

### ✅ Generic Cache Methods
```go
// RIGHT - Cache is generic
type Cache interface {
    Set(ctx, key, value, ttl) error
    Get(ctx, key) (string, error)
}

// Service implements caching logic
func (s *service) GetPostByID(ctx, id) {
    key := fmt.Sprintf("post:id:%d", id)
    cached, _ := s.cache.Get(ctx, key)
    // ... unmarshal, etc
}
```

### ❌ Repository in Domain Directory
```
post/
├── repository.go  ❌ WRONG
└── service.go
```

### ✅ Repository in Repo Directory
```
repo/
├── post_repository.go  ✅ RIGHT
└── post_version_repository.go

post/
├── port.go       # Defines Repository interface
├── svc.go        # Service constructor
└── service.go    # Business logic
```

## References

- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [Hexagonal Architecture by Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
