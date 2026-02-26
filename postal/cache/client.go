package cache

import (
	"crypto/tls"
	"fmt"
	"strings"
	"time"

	goRedis "github.com/redis/go-redis/v9"
)

// Tests

func NewRedisClient(redisURL string, enableRedisTLSMode bool) (*goRedis.Client, error) {
	redisURL = strings.TrimSpace(redisURL)
	if redisURL == "" {
		return nil, nil
	}

	opt, err := goRedis.ParseURL(redisURL)
	if err != nil {
		return nil, fmt.Errorf("invalid redis URL: %w", err)
	}

	if enableRedisTLSMode {
		opt.TLSConfig = &tls.Config{MinVersion: tls.VersionTLS12}
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

	return goRedis.NewClient(opt), nil
}
