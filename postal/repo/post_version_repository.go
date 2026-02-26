package repo

import (
	"context"

	"postal/domain"
	"postal/post_version"

	"gorm.io/gorm"
)

type postVersionRepository struct {
	db *gorm.DB
}

func NewPostVersionRepository(db *gorm.DB) post_version.Repository {
	return &postVersionRepository{db: db}
}

func (r *postVersionRepository) Create(ctx context.Context, version *domain.PostVersion) error {
	return r.db.WithContext(ctx).Create(version).Error
}

func (r *postVersionRepository) GetByPostID(ctx context.Context, postID uint) ([]*domain.PostVersion, error) {
	var versions []*domain.PostVersion
	err := r.db.WithContext(ctx).
		Where("post_id = ?", postID).
		Order("version_no DESC").
		Find(&versions).Error
	return versions, err
}

func (r *postVersionRepository) GetByID(ctx context.Context, id uint) (*domain.PostVersion, error) {
	var version domain.PostVersion
	err := r.db.WithContext(ctx).First(&version, id).Error
	return &version, err
}
