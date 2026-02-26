package cache

import (
	"context"
	"log/slog"
	"time"

	"cortex/logger"

	"go.elastic.co/apm"
)

func (c *cache) Set(ctx context.Context, key string, value any, expiration time.Duration) error {
	span, _ := apm.StartSpan(ctx, "Set", "redis")
	defer span.End()

	// Add timeout to prevent hanging requests
	ctx, cancel := context.WithTimeout(ctx, 200*time.Millisecond)
	defer cancel()

	err := c.writeClient.Set(ctx, key, value, expiration).Err()
	if err != nil {
		slog.ErrorContext(ctx, "Failed to set value in redis", logger.Extra(map[string]any{
			"error": err.Error(),
			"key":   key,
		}))
		return err
	}

	return nil
}
