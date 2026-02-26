package main

import (
	"postal/cache"
	"postal/cmd"
)

func main() {
	// Initialize DNS caching to reduce DNS lookup overhead
	cache.InitDNSCache()

	cmd.Execute()
}
