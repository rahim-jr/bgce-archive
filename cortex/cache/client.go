package cache

import (
	"crypto/tls"
	"log/slog"
	"time"

	goRedis "github.com/redis/go-redis/v9"

	"cortex/logger"
)

func redisOptions(redisUrl string, enableRedisTLSMode bool) (*goRedis.Options, error) {
	opt, err := goRedis.ParseURL(redisUrl)
	if err != nil {
		return nil, err
	}

	if enableRedisTLSMode {
		tlsConfig := &tls.Config{
			MinVersion: tls.VersionTLS12,
		}

		opt.TLSConfig = tlsConfig
	}

	// Configure connection pool for better performance
	opt.PoolSize = 10     // Max number of socket connections
	opt.MinIdleConns = 5  // Minimum idle connections
	opt.MaxIdleConns = 10 // Maximum idle connections
	opt.ConnMaxIdleTime = 5 * time.Minute
	opt.ConnMaxLifetime = 30 * time.Minute
	opt.PoolTimeout = 4 * time.Second // Wait time for connection from pool
	opt.ReadTimeout = 3 * time.Second
	opt.WriteTimeout = 3 * time.Second

	return opt, nil
}

func NewRedisClient(redisUrl string, enableRedisTLSMode bool) (*goRedis.Client, error) {
	opt, err := redisOptions(redisUrl, enableRedisTLSMode)
	if err != nil {
		slog.Error("Unable to parse the redis URL", logger.Extra(map[string]any{
			"error": err.Error(),
		}))
		return nil, err
	}

	client := goRedis.NewClient(opt)

	return client, nil
}
