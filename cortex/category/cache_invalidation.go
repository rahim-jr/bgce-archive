package category

import (
	"context"
	"log/slog"

	"cortex/logger"
)

// invalidateCategoryListCache removes all category list cache entries
// This should be called after creating, updating, or deleting categories
func (s *service) invalidateCategoryListCache(ctx context.Context) {
	if s.cache == nil {
		return
	}

	// Delete common cache key patterns for category lists
	// These patterns match the keys generated in buildCategoryListCacheKey
	patterns := []string{
		"category:list",
		"category:list:*",
	}

	for _, pattern := range patterns {
		if err := s.cache.Del(ctx, pattern); err != nil {
			slog.WarnContext(ctx, "Failed to invalidate category list cache", logger.Extra(map[string]any{
				"pattern": pattern,
				"error":   err.Error(),
			}))
		}
	}

	slog.InfoContext(ctx, "Category list cache invalidated")
}
