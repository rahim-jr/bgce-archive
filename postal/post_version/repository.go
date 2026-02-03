package post_version

import (
	"context"

	"gorm.io/gorm"
)

type Repository interface {
	Create(ctx context.Context, version *PostVersion) error
	GetByPostID(ctx context.Context, postID uint) ([]*PostVersion, error)
	GetByID(ctx context.Context, id uint) (*PostVersion, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) Repository {
	return &repository{db: db}
}

func (r *repository) Create(ctx context.Context, version *PostVersion) error {
	return r.db.WithContext(ctx).Create(version).Error
}

func (r *repository) GetByPostID(ctx context.Context, postID uint) ([]*PostVersion, error) {
	var versions []*PostVersion
	err := r.db.WithContext(ctx).
		Where("post_id = ?", postID).
		Order("version_no DESC").
		Find(&versions).Error
	return versions, err
}

func (r *repository) GetByID(ctx context.Context, id uint) (*PostVersion, error) {
	var version PostVersion
	err := r.db.WithContext(ctx).First(&version, id).Error
	return &version, err
}
