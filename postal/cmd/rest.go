package cmd

import (
	"fmt"
	"log"
	"net/http"

	"postal/config"
	"postal/post"
	"postal/post_version"
	"postal/repo"
	"postal/rest"
	"postal/rest/handlers"
	"postal/rest/middlewares"

	"github.com/spf13/cobra"
)

var restCmd = &cobra.Command{
	Use:   "rest",
	Short: "Start the REST API server",
	Long:  `Start the HTTP REST API server for the Postal service`,
	RunE:  runRESTServer,
}

func runRESTServer(cmd *cobra.Command, args []string) error {
	// Load configuration
	cfg := config.LoadConfig()
	log.Printf("🚀 Starting %s v%s in %s mode", cfg.ServiceName, cfg.Version, cfg.Mode)
	log.Printf("📊 Database: %s", cfg.PostalDBDSN)
	log.Printf("🔌 Port: %s", cfg.HTTPPort)

	// Initialize database
	log.Println("🔄 Connecting to database...")
	db, err := config.InitDatabase(cfg)
	if err != nil {
		log.Printf("❌ Database connection failed: %v", err)
		return fmt.Errorf("failed to initialize database: %w", err)
	}
	defer config.CloseDatabase()

	// Run migrations
	log.Println("🔄 Running database migrations...")
	if err := repo.AutoMigrate(db); err != nil {
		log.Printf("❌ Migration failed: %v", err)
		return fmt.Errorf("failed to run migrations: %w", err)
	}

	// Initialize repositories
	log.Println("🔄 Initializing repositories...")
	postRepo := post.NewRepository(db)
	versionRepo := post_version.NewRepository(db)

	// Initialize services
	log.Println("🔄 Initializing services...")
	postService := post.NewService(postRepo, versionRepo)

	// Initialize handlers
	log.Println("🔄 Initializing handlers...")
	h := handlers.NewHandlers(postService, versionRepo)

	// Initialize middlewares
	log.Println("🔄 Initializing middlewares...")
	mw := middlewares.NewMiddlewares(cfg.JWTSecret)

	// Create server
	log.Println("🔄 Creating HTTP server...")
	mux := rest.NewServeMux(mw, h)

	// Start server
	addr := ":" + cfg.HTTPPort
	log.Printf("✅ Server ready!")
	log.Printf("🌐 Listening on http://localhost%s", addr)
	log.Printf("📝 Health check: http://localhost%s/api/v1/health", addr)
	log.Printf("📚 API Base: http://localhost%s/api/v1", addr)
	log.Println("Press Ctrl+C to stop")

	if err := http.ListenAndServe(addr, mux); err != nil {
		log.Printf("❌ Server error: %v", err)
		return fmt.Errorf("server error: %w", err)
	}

	return nil
}
