package category

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"strconv"
	"time"

	"cortex/ent"
	"cortex/ent/category"
	"cortex/logger"
)

func (s *service) FindCategoryByID(ctx context.Context, id int) (*ent.Category, error) {
	// Try cache first
	if s.cache != nil {
		cacheKey := buildCategoryIDCacheKey(id)
		cached, err := s.cache.Get(ctx, cacheKey)
		if err == nil && cached != "" {
			var cat ent.Category
			if err := json.Unmarshal([]byte(cached), &cat); err == nil {
				slog.InfoContext(ctx, "Cache HIT - returning category from Redis", logger.Extra(map[string]any{
					"id": id,
				}))
				return &cat, nil
			}
		}
	}

	// Cache MISS - query database
	slog.InfoContext(ctx, "Cache MISS - loading category from DB", logger.Extra(map[string]any{
		"id": id,
	}))

	cat, err := s.ent.Category.Query().Where(
		category.IDEQ(id),
	).First(ctx)
	if err != nil {
		return nil, errors.New("ent: category not found")
	}

	// Cache the result (24 hours TTL)
	if s.cache != nil {
		cacheKey := buildCategoryIDCacheKey(id)
		if err := s.cache.SetJSON(ctx, cacheKey, cat, 24*time.Hour); err != nil {
			slog.ErrorContext(ctx, "Failed to cache category", logger.Extra(map[string]any{
				"error": err.Error(),
			}))
		}
	}

	return cat, nil
}

func buildCategoryIDCacheKey(id int) string {
	return "category:id:" + strconv.Itoa(id)
}
