package subcategory

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"time"

	"cortex/ent"
	"cortex/ent/category"
	"cortex/logger"

	"github.com/google/uuid"
)

func (s *service) GetAllSubcategories(ctx context.Context, filter GetSubcategoryFilter) ([]*Subcategory, error) {
	// Try cache first
	if s.cache != nil {
		cacheKey := buildSubcategoryListCacheKey(filter)
		cached, err := s.cache.Get(ctx, cacheKey)
		if err == nil && cached != "" {
			var subcategories []*Subcategory
			if err := json.Unmarshal([]byte(cached), &subcategories); err == nil {
				slog.InfoContext(ctx, "Cache HIT - returning subcategory list from Redis", logger.Extra(map[string]any{
					"key": cacheKey,
				}))
				return subcategories, nil
			}
		}
	}

	// Cache MISS - query database
	slog.InfoContext(ctx, "Cache MISS - loading subcategory list from DB")

	// Build query for all subcategories (categories with parent_id not null)
	query := s.ent.Category.Query().
		Where(category.ParentIDNotNil())

	// Apply filters
	if filter.ID != nil {
		query = query.Where(category.IDEQ(*filter.ID))
	}
	if filter.UUID != nil {
		query = query.Where(category.UUIDEQ(filter.UUID.String()))
	}
	if filter.Slug != nil {
		query = query.Where(category.SlugEQ(*filter.Slug))
	}
	if filter.Label != nil {
		query = query.Where(category.LabelEQ(*filter.Label))
	}
	if filter.Status != nil {
		query = query.Where(category.StatusEQ(category.Status(*filter.Status)))
	}
	if filter.Limit != nil {
		query = query.Limit(*filter.Limit)
	}
	if filter.Offset != nil {
		query = query.Offset(*filter.Offset)
	}
	if filter.SortBy != nil && filter.SortOrder != nil {
		switch *filter.SortBy {
		case "created_at":
			if *filter.SortOrder == "desc" {
				query = query.Order(ent.Desc(category.FieldCreatedAt))
			} else {
				query = query.Order(ent.Asc(category.FieldCreatedAt))
			}
		case "label":
			if *filter.SortOrder == "desc" {
				query = query.Order(ent.Desc(category.FieldLabel))
			} else {
				query = query.Order(ent.Asc(category.FieldLabel))
			}
		case "slug":
			if *filter.SortOrder == "desc" {
				query = query.Order(ent.Desc(category.FieldSlug))
			} else {
				query = query.Order(ent.Asc(category.FieldSlug))
			}
		}
	}

	subcategories, err := query.All(ctx)
	if err != nil {
		return nil, errors.New("failed to retrieve subcategories")
	}

	var result []*Subcategory
	for _, sc := range subcategories {
		subcategoryUUID, err := uuid.Parse(sc.UUID)
		if err != nil {
			continue // Skip invalid UUIDs
		}

		// Convert int fields to *int for optional fields
		var updatedBy, approvedBy, deletedBy *int
		if sc.UpdatedBy != 0 {
			updatedBy = &sc.UpdatedBy
		}
		if sc.ApprovedBy != 0 {
			approvedBy = &sc.ApprovedBy
		}
		if sc.DeletedBy != 0 {
			deletedBy = &sc.DeletedBy
		}

		// Convert time fields to *time.Time for optional fields
		var approvedAt, deletedAt *time.Time
		if !sc.ApprovedAt.IsZero() {
			approvedAt = &sc.ApprovedAt
		}
		if !sc.DeletedAt.IsZero() {
			deletedAt = &sc.DeletedAt
		}

		result = append(result, &Subcategory{
			ID:          sc.ID,
			ParentID:    sc.ParentID,
			UUID:        subcategoryUUID,
			Slug:        sc.Slug,
			Label:       sc.Label,
			Description: sc.Description,
			CreatedBy:   sc.CreatedBy,
			UpdatedBy:   updatedBy,
			ApprovedBy:  approvedBy,
			DeletedBy:   deletedBy,
			CreatedAt:   sc.CreatedAt,
			UpdatedAt:   sc.UpdatedAt,
			ApprovedAt:  approvedAt,
			DeletedAt:   deletedAt,
			Status:      string(sc.Status),
			Meta:        sc.Meta,
		})
	}

	// Cache the result (5 minutes TTL for lists)
	if s.cache != nil {
		cacheKey := buildSubcategoryListCacheKey(filter)
		if err := s.cache.SetJSON(ctx, cacheKey, result, 5*time.Minute); err != nil {
			slog.ErrorContext(ctx, "Failed to cache subcategory list", logger.Extra(map[string]any{
				"error": err.Error(),
			}))
		}
	}

	return result, nil
}

func buildSubcategoryListCacheKey(filter GetSubcategoryFilter) string {
	key := "subcategory:list"
	if filter.ID != nil {
		key += ":id:" + string(rune(*filter.ID))
	}
	if filter.UUID != nil {
		key += ":uuid:" + filter.UUID.String()
	}
	if filter.Slug != nil {
		key += ":slug:" + *filter.Slug
	}
	if filter.Status != nil {
		key += ":status:" + *filter.Status
	}
	if filter.Limit != nil {
		key += ":limit:" + string(rune(*filter.Limit))
	}
	if filter.Offset != nil {
		key += ":offset:" + string(rune(*filter.Offset))
	}
	return key
}
