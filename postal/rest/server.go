package rest

import (
	"net/http"

	"postal/rest/handlers"
	"postal/rest/middlewares"
)

func NewServeMux(mw *middlewares.Middlewares, h *handlers.Handlers) http.Handler {
	mux := http.NewServeMux()

	// Health check and root
	mux.HandleFunc("/api/v1/health", func(w http.ResponseWriter, r *http.Request) {
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok","service":"postal","version":"1.0.0"}`))
	})

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		if r.Method != http.MethodGet {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"message":"Postal API - Archive Posts Service","version":"1.0.0","endpoints":{"/api/v1/health":"Health check","/api/v1/posts":"List posts"}}`))
	})

	// Public routes
	mux.HandleFunc("/api/v1/posts", func(w http.ResponseWriter, r *http.Request) {
		if r.Method == http.MethodGet {
			h.ListPosts(w, r)
		} else if r.Method == http.MethodPost {
			// Create post (protected)
			mw.AuthenticateJWT(http.HandlerFunc(h.CreatePost)).ServeHTTP(w, r)
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	mux.HandleFunc("/api/v1/posts/", func(w http.ResponseWriter, r *http.Request) {
		// Handle /api/v1/posts/{id} and /api/v1/posts/slug/{slug}
		path := r.URL.Path
		if r.Method == http.MethodGet {
			// Check if it's a slug route
			if len(path) > len("/api/v1/posts/slug/") && path[:len("/api/v1/posts/slug/")] == "/api/v1/posts/slug/" {
				h.GetPostBySlug(w, r)
				return
			}
			// Otherwise it's an ID route
			h.GetPostByID(w, r)
		} else if r.Method == http.MethodPut {
			mw.AuthenticateJWT(http.HandlerFunc(h.UpdatePost)).ServeHTTP(w, r)
		} else if r.Method == http.MethodDelete {
			mw.AuthenticateJWT(http.HandlerFunc(h.DeletePost)).ServeHTTP(w, r)
		} else if r.Method == http.MethodPost {
			// Handle action routes: publish, unpublish, archive
			if len(path) > len("/api/v1/posts/") {
				if path[len(path)-8:] == "/publish" {
					mw.AuthenticateJWT(http.HandlerFunc(h.PublishPost)).ServeHTTP(w, r)
				} else if path[len(path)-10:] == "/unpublish" {
					mw.AuthenticateJWT(http.HandlerFunc(h.UnpublishPost)).ServeHTTP(w, r)
				} else if path[len(path)-8:] == "/archive" {
					mw.AuthenticateJWT(http.HandlerFunc(h.ArchivePost)).ServeHTTP(w, r)
				} else {
					// POST to /api/v1/posts (create)
					mw.AuthenticateJWT(http.HandlerFunc(h.CreatePost)).ServeHTTP(w, r)
				}
			} else {
				mw.AuthenticateJWT(http.HandlerFunc(h.CreatePost)).ServeHTTP(w, r)
			}
		} else {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		}
	})

	// Apply global middlewares
	handler := middlewares.CORS(mux)
	handler = middlewares.Logger(handler)

	return handler
}
