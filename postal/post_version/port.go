package post_version

import (
	"context"

	"postal/domain"
)

// Repository defines the interface for post version persistence
type Repository interface {
	Create(ctx context.Context, version *domain.PostVersion) error
	GetByPostID(ctx context.Context, postID uint) ([]*domain.PostVersion, error)
	GetByID(ctx context.Context, id uint) (*domain.PostVersion, error)
}
