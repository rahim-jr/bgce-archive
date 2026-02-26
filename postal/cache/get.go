package cache

import (
	"context"
	"fmt"

	goRedis "github.com/redis/go-redis/v9"
)

func (c *cache) Get(ctx context.Context, key string) (string, error) {
	if c.readClient == nil {
		return "", nil
	}

	value, err := c.readClient.Get(ctx, key).Result()
	if err != nil {
		if err == goRedis.Nil {
			return "", nil // Cache miss
		}
		return "", fmt.Errorf("failed to get value for key %q from redis: %w", key, err)
	}

	return value, nil
}
