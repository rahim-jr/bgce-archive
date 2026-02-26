package main

import (
	"context"
	"os/signal"
	"syscall"

	"cortex/cache"
	"cortex/cmd"
)

func main() {
	// Initialize DNS caching to reduce DNS lookup overhead
	cache.InitDNSCache()

	ctx, cancel := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer cancel()
	cmd.Execute(ctx)
}
