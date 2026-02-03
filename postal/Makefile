.PHONY: help build run dev test clean docker-build docker-up docker-down install-air

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

build: ## Build the application
	@echo "Building postal..."
	@go build -o postal main.go
	@echo "✅ Build complete"

run: ## Run the application
	@echo "Running postal..."
	@go run main.go rest

dev: ## Run with hot reload (requires air - run 'make install-air' first)
	@if command -v air > /dev/null; then \
		echo "Starting development server with hot reload..."; \
		air; \
	else \
		echo "❌ Air is not installed. Install it with: make install-air"; \
		echo "Or run without hot reload: make run"; \
		exit 1; \
	fi

install-air: ## Install air for hot reload
	@echo "Installing air..."
	@go install github.com/air-verse/air@latest
	@echo "✅ Air installed successfully"
	@echo "Make sure $(go env GOPATH)/bin is in your PATH"

test: ## Run tests
	@echo "Running tests..."
	@go test -v ./...

clean: ## Clean build artifacts
	@echo "Cleaning..."
	@rm -f postal
	@rm -rf tmp/
	@echo "✅ Clean complete"

tidy: ## Tidy go modules
	@echo "Tidying modules..."
	@go mod tidy
	@echo "✅ Tidy complete"

docker-build: ## Build Docker image
	@echo "Building Docker image..."
	@docker build -t postal:latest .
	@echo "✅ Docker image built"

docker-up: ## Start services with docker-compose
	@echo "Starting services..."
	@docker-compose up -d
	@echo "✅ Services started"

docker-down: ## Stop services
	@echo "Stopping services..."
	@docker-compose down
	@echo "✅ Services stopped"

docker-logs: ## View docker logs
	@docker-compose logs -f

migrate: ## Run database migrations
	@echo "Running migrations..."
	@go run main.go migrate
	@echo "✅ Migrations complete"
