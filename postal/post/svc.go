package post

import (
	"postal/cache"
	"postal/post_version"
)

// NewService creates a new post service with injected dependencies
func NewService(repo Repository, versionRepo post_version.Repository, cache cache.Cache) Service {
	return &service{
		repo:        repo,
		versionRepo: versionRepo,
		cache:       cache,
	}
}
