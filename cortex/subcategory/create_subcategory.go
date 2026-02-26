package subcategory

import (
	"context"
	"fmt"

	"cortex/ent/category"
	customerrors "cortex/pkg/custom_errors"
)

func (s *service) CreateSubcategory(ctx context.Context, params CreateSubcategoryParams) error {
	// Check if slug already exists
	exists, err := s.ent.Category.Query().
		Where(category.Slug(params.Slug)).
		Exist(ctx)
	if err != nil {
		return fmt.Errorf("failed to check slug uniqueness: %w", err)
	}
	if exists {
		return customerrors.ErrSlugExists
	}

	// Verify parent category exists
	parentExists, err := s.ent.Category.Query().
		Where(category.IDEQ(params.ParentID)).
		Exist(ctx)
	if err != nil {
		return fmt.Errorf("failed to verify parent category: %w", err)
	}
	if !parentExists {
		return fmt.Errorf("parent category with ID %d not found", params.ParentID)
	}

	// Create the subcategory
	_, err = s.ent.Category.Create().
		SetSlug(params.Slug).
		SetLabel(params.Label).
		SetDescription(params.Description).
		SetCreatedBy(params.CreatorID).
		SetCreatorID(params.CreatorID).
		SetParentID(params.ParentID).
		SetMeta(params.Meta).
		Save(ctx)
	if err != nil {
		return fmt.Errorf("failed to create subcategory: %w", err)
	}

	// Invalidate subcategory list cache to show new subcategory immediately
	if s.cache != nil {
		s.invalidateSubcategoryListCache(ctx)
	}

	return nil
}
