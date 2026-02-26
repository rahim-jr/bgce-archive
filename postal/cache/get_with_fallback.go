package cache

import (
	"context"
	"encoding/json"
	"log"
	"time"

	goRedis "github.com/redis/go-redis/v9"
)

// GetWithFallback attempts to get a value from cache, and if not found or error occurs,
// executes the fallback function and asynchronously updates the cache
func (c *cache) GetWithFallback(ctx context.Context, key string, ttl time.Duration, fallback func() (interface{}, error)) (interface{}, error) {
	if c.readClient == nil {
		// No cache available, use fallback directly
		return fallback()
	}

	// Try cache first with timeout
	cacheCtx, cancel := context.WithTimeout(ctx, 100*time.Millisecond)
	defer cancel()

	val, err := c.readClient.Get(cacheCtx, key).Result()
	if err == nil {
		// Cache hit - return the value
		return val, nil
	}

	// Log cache errors but don't fail the request
	if err != goRedis.Nil {
		log.Printf("Redis cache error for key %s, using fallback: %v", key, err)
	}

	// Cache miss or error - use fallback
	result, err := fallback()
	if err != nil {
		return nil, err
	}

	// Async cache update (don't block response)
	if c.writeClient != nil {
		go func() {
			updateCtx, updateCancel := context.WithTimeout(context.Background(), 1*time.Second)
			defer updateCancel()

			// Serialize result if needed
			var cacheValue string
			if strVal, ok := result.(string); ok {
				cacheValue = strVal
			} else {
				// If not a string, marshal to JSON
				jsonBytes, err := json.Marshal(result)
				if err != nil {
					log.Printf("Failed to marshal result for cache key %s: %v", key, err)
					return
				}
				cacheValue = string(jsonBytes)
			}

			if err := c.writeClient.Set(updateCtx, key, cacheValue, ttl).Err(); err != nil {
				log.Printf("Failed to update cache for key %s: %v", key, err)
			}
		}()
	}

	return result, nil
}
