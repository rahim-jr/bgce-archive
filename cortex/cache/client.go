package cache

import (
	"crypto/tls"
	"log/slog"
	"time"

	goRedis "github.com/redis/go-redis/v9"

	"cortex/logger"
)

func redisOptions(redisUrl string, enableRedisTLSMode bool, isWriteClient bool) (*goRedis.Options, error) {
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

	// Configure connection pool for high performance
	// Different settings for read vs write clients
	if isWriteClient {
		// Write client - moderate pool size
		opt.PoolSize = 20     // Max connections in pool
		opt.MinIdleConns = 5  // Keep 5 idle connections ready
		opt.MaxIdleConns = 10 // Max idle connections
	} else {
		// Read client - larger pool for high read throughput
		opt.PoolSize = 50     // Max connections in pool
		opt.MinIdleConns = 10 // Keep 10 idle connections ready
		opt.MaxIdleConns = 20 // Max idle connections
	}

	// Connection lifecycle settings
	opt.ConnMaxIdleTime = 5 * time.Minute  // Close idle connections after 5 minutes
	opt.ConnMaxLifetime = 30 * time.Minute // Recycle connections after 30 minutes

	// Timeout settings - aggressive for low latency
	opt.PoolTimeout = 4 * time.Second  // Wait time for connection from pool
	opt.DialTimeout = 2 * time.Second  // Connection establishment timeout
	opt.ReadTimeout = 2 * time.Second  // Socket read timeout
	opt.WriteTimeout = 2 * time.Second // Socket write timeout

	return opt, nil
}

func NewRedisClient(redisUrl string, enableRedisTLSMode bool, isWriteClient bool) (*goRedis.Client, error) {
	opt, err := redisOptions(redisUrl, enableRedisTLSMode, isWriteClient)
	if err != nil {
		slog.Error("Unable to parse the redis URL", logger.Extra(map[string]any{
			"error": err.Error(),
		}))
		return nil, err
	}

	client := goRedis.NewClient(opt)

	return client, nil
}
