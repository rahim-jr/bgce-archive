package cache

import (
	"context"
	"encoding/json"
	"log/slog"
	"time"

	"cortex/logger"
)

// GetWithFallback attempts to get a value from cache, and if not found or error occurs,
// executes the fallback function and asynchronously updates the cache
func (c *cache) GetWithFallback(ctx context.Context, key string, ttl time.Duration, fallback func() (interface{}, error)) (interface{}, error) {
	// Try cache first with timeout
	// Increased from 100ms to 1s to allow for connection establishment
	cacheCtx, cancel := context.WithTimeout(ctx, 1*time.Second)
	defer cancel()

	val, err := c.readClient.Get(cacheCtx, key).Result()
	if err == nil {
		// Cache hit - return the value
		return val, nil
	}

	// Log cache errors but don't fail the request
	if err.Error() != "redis: nil" {
		slog.WarnContext(ctx, "Redis cache error, using fallback", logger.Extra(map[string]any{
			"error": err.Error(),
			"key":   key,
		}))
	}

	// Cache miss or error - use fallback
	result, err := fallback()
	if err != nil {
		return nil, err
	}

	// Async cache update (don't block response)
	go func() {
		updateCtx, updateCancel := context.WithTimeout(context.Background(), 2*time.Second)
		defer updateCancel()

		// Serialize result if needed
		var cacheValue string
		if strVal, ok := result.(string); ok {
			cacheValue = strVal
		} else {
			// If not a string, marshal to JSON
			jsonBytes, err := json.Marshal(result)
			if err != nil {
				slog.Warn("Failed to marshal result for cache", logger.Extra(map[string]any{
					"error": err.Error(),
					"key":   key,
				}))
				return
			}
			cacheValue = string(jsonBytes)
		}

		if err := c.writeClient.Set(updateCtx, key, cacheValue, ttl).Err(); err != nil {
			slog.Warn("Failed to update cache", logger.Extra(map[string]any{
				"error": err.Error(),
				"key":   key,
			}))
		}
	}()

	return result, nil
}
