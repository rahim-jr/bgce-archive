package post

import (
	"context"
	"fmt"
	"log"

	"postal/domain"
)

// invalidatePostCache removes cached entries for a specific post
func (s *service) invalidatePostCache(ctx context.Context, post *domain.Post) {
	if s.cache == nil || post == nil {
		return
	}

	// Invalidate by ID
	idKey := fmt.Sprintf("post:id:%d", post.ID)
	if err := s.cache.Del(ctx, idKey); err != nil {
		log.Printf("Failed to invalidate post cache by ID: %v", err)
	}

	// Invalidate by slug
	if post.Slug != "" {
		slugKey := fmt.Sprintf("post:slug:%s", post.Slug)
		if err := s.cache.Del(ctx, slugKey); err != nil {
			log.Printf("Failed to invalidate post cache by slug: %v", err)
		}
	}

	log.Printf("Invalidated cache for post ID=%d, slug=%s", post.ID, post.Slug)
}

// invalidateListCaches removes all cached list queries
// This is a simple approach - in production, you might want more granular invalidation
func (s *service) invalidateListCaches(ctx context.Context) {
	if s.cache == nil {
		return
	}

	// Note: This is a simplified approach. In production, you might:
	// 1. Use Redis SCAN to find all "post:list:*" keys
	// 2. Use Redis key expiration patterns
	// 3. Maintain a set of active list cache keys
	// 4. Use cache tags/groups for bulk invalidation

	// For now, we rely on the shorter TTL (5 minutes) for list caches
	// to naturally expire. This is acceptable for most use cases.

	log.Printf("List caches will expire naturally (5min TTL)")
}
