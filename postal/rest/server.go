package rest

import (
	"net/http"

	"postal/rest/handlers"
	"postal/rest/middlewares"
)

func NewServeMux(mw *middlewares.Middlewares, h *handlers.Handlers) http.Handler {
	mux := http.NewServeMux()

	// Public routes
	mux.HandleFunc("GET /api/v1/posts", h.ListPosts)
	mux.HandleFunc("GET /api/v1/posts/{id}", h.GetPostByID)
	mux.HandleFunc("GET /api/v1/posts/slug/{slug}", h.GetPostBySlug)

	// Protected routes (Admin only)
	mux.HandleFunc("POST /api/v1/posts", func(w http.ResponseWriter, r *http.Request) {
		mw.AuthenticateJWT(http.HandlerFunc(h.CreatePost)).ServeHTTP(w, r)
	})

	mux.HandleFunc("PUT /api/v1/posts/{id}", func(w http.ResponseWriter, r *http.Request) {
		mw.AuthenticateJWT(http.HandlerFunc(h.UpdatePost)).ServeHTTP(w, r)
	})

	mux.HandleFunc("POST /api/v1/posts/{id}/publish", func(w http.ResponseWriter, r *http.Request) {
		mw.AuthenticateJWT(http.HandlerFunc(h.PublishPost)).ServeHTTP(w, r)
	})

	mux.HandleFunc("POST /api/v1/posts/{id}/unpublish", func(w http.ResponseWriter, r *http.Request) {
		mw.AuthenticateJWT(http.HandlerFunc(h.UnpublishPost)).ServeHTTP(w, r)
	})

	mux.HandleFunc("POST /api/v1/posts/{id}/archive", func(w http.ResponseWriter, r *http.Request) {
		mw.AuthenticateJWT(http.HandlerFunc(h.ArchivePost)).ServeHTTP(w, r)
	})

	mux.HandleFunc("DELETE /api/v1/posts/{id}", func(w http.ResponseWriter, r *http.Request) {
		mw.AuthenticateJWT(http.HandlerFunc(h.DeletePost)).ServeHTTP(w, r)
	})

	// Health check
	mux.HandleFunc("GET /api/v1/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	// Apply global middlewares
	handler := middlewares.CORS(mux)
	handler = middlewares.Logger(handler)

	return handler
}
