package middlewares

import "context"

type Cache interface {
	Get(ctx context.Context, key string) (string, error)
	RedisEnabledKey() string
	FlushAll(ctx context.Context) error
}

type CortexConfig struct {
	UseRedisCache bool
}
