package subcategory

import (
	"context"
	"log/slog"

	"cortex/logger"
)

// invalidateSubcategoryListCache removes all subcategory list cache entries
// This should be called after creating, updating, or deleting subcategories
func (s *service) invalidateSubcategoryListCache(ctx context.Context) {
	if s.cache == nil {
		return
	}

	// Delete common cache key patterns for subcategory lists
	// These patterns match the keys generated in buildSubcategoryListCacheKey
	patterns := []string{
		"subcategory:list",
		"subcategory:list:*",
	}

	for _, pattern := range patterns {
		if err := s.cache.Del(ctx, pattern); err != nil {
			slog.WarnContext(ctx, "Failed to invalidate subcategory list cache", logger.Extra(map[string]any{
				"pattern": pattern,
				"error":   err.Error(),
			}))
		}
	}

	slog.InfoContext(ctx, "Subcategory list cache invalidated")
}
