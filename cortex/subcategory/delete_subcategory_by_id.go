package subcategory

import (
	"context"
	"fmt"

	"cortex/ent/category"
	customerrors "cortex/pkg/custom_errors"
)

func (s *service) DeleteSubcategoryByID(ctx context.Context, id int, deletedBy int) error {
	// Find the subcategory by ID
	subcategory, err := s.ent.Category.Query().
		Where(category.IDEQ(id)).
		Where(category.ParentIDNotNil()). // Ensure it's a subcategory
		First(ctx)
	if err != nil {
		return customerrors.ErrCategoryNotFound
	}

	// Soft delete by updating status and deleted_by
	err = s.ent.Category.UpdateOne(subcategory).
		SetStatus(category.StatusDeleted).
		SetDeletedBy(deletedBy).
		Exec(ctx)
	if err != nil {
		return fmt.Errorf("failed to delete subcategory: %w", err)
	}

	return nil
}
