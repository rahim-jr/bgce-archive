package handlers

import (
	"log/slog"
	"net/http"

	"cortex/logger"
	"cortex/rest/utils"
)

// FlushCache clears all cache entries
// This is a protected endpoint that requires authentication
func (h *Handlers) FlushCache(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	slog.InfoContext(ctx, "Cache flush requested", logger.Extra(map[string]any{
		"user_agent": r.UserAgent(),
		"ip":         r.RemoteAddr,
	}))

	// Flush the cache
	if err := h.Cache.FlushAll(ctx); err != nil {
		slog.ErrorContext(ctx, "Failed to flush cache", logger.Extra(map[string]any{
			"error": err.Error(),
		}))
		utils.SendError(w, http.StatusInternalServerError, "Failed to flush cache", err)
		return
	}

	slog.InfoContext(ctx, "Cache flushed successfully")
	utils.SendData(w, map[string]string{
		"message": "Cache flushed successfully",
	})
}
