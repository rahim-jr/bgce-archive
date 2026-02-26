package cache

import (
	"context"
	"log/slog"

	"cortex/logger"
)

// FlushAll removes all keys from the Redis cache
// WARNING: This is a destructive operation that clears the entire cache
func (c *cache) FlushAll(ctx context.Context) error {
	if c.writeClient == nil {
		slog.WarnContext(ctx, "Cache client is nil, cannot flush")
		return nil
	}

	// Use FlushDB to clear the current database
	// Note: FlushAll would clear ALL databases, FlushDB only clears the current one
	if err := c.writeClient.FlushDB(ctx).Err(); err != nil {
		slog.ErrorContext(ctx, "Failed to flush cache", logger.Extra(map[string]any{
			"error": err.Error(),
		}))
		return err
	}

	slog.InfoContext(ctx, "Cache flushed successfully")
	return nil
}
