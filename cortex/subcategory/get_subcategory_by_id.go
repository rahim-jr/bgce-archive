package subcategory

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"strconv"
	"time"

	"cortex/ent/category"
	"cortex/logger"
	customerrors "cortex/pkg/custom_errors"

	"github.com/google/uuid"
)

func (s *service) GetSubcategoryByID(ctx context.Context, id int) (*Subcategory, error) {
	// Try cache first
	if s.cache != nil {
		cacheKey := buildSubcategoryIDCacheKey(id)
		cached, err := s.cache.Get(ctx, cacheKey)
		if err == nil && cached != "" {
			var subcategory Subcategory
			if err := json.Unmarshal([]byte(cached), &subcategory); err == nil {
				slog.InfoContext(ctx, "Cache HIT - returning subcategory from Redis", logger.Extra(map[string]any{
					"id": id,
				}))
				return &subcategory, nil
			}
		}
	}

	// Cache MISS - query database
	slog.InfoContext(ctx, "Cache MISS - loading subcategory from DB", logger.Extra(map[string]any{
		"id": id,
	}))

	sc, err := s.ent.Category.Query().
		Where(category.IDEQ(id)).
		First(ctx)
	if err != nil {
		return nil, customerrors.ErrCategoryNotFound
	}

	// Check if it's actually a subcategory (has a parent)
	if sc.ParentID == 0 {
		return nil, errors.New("category is not a subcategory")
	}

	parsedUUID, err := uuid.Parse(sc.UUID)
	if err != nil {
		return nil, errors.New("invalid subcategory UUID")
	}

	result := &Subcategory{
		ID:          sc.ID,
		ParentID:    sc.ParentID,
		UUID:        parsedUUID,
		Slug:        sc.Slug,
		Label:       sc.Label,
		Description: sc.Description,
		CreatedBy:   sc.CreatedBy,
		UpdatedBy:   &sc.UpdatedBy,
		ApprovedBy:  &sc.ApprovedBy,
		DeletedBy:   &sc.DeletedBy,
		CreatedAt:   sc.CreatedAt,
		UpdatedAt:   sc.UpdatedAt,
		ApprovedAt:  &sc.ApprovedAt,
		DeletedAt:   &sc.DeletedAt,
		Status:      string(sc.Status),
		Meta:        sc.Meta,
	}

	// Cache the result (24 hours TTL)
	if s.cache != nil {
		cacheKey := buildSubcategoryIDCacheKey(id)
		if err := s.cache.SetJSON(ctx, cacheKey, result, 24*time.Hour); err != nil {
			slog.ErrorContext(ctx, "Failed to cache subcategory", logger.Extra(map[string]any{
				"error": err.Error(),
			}))
		}
	}

	return result, nil
}

func (s *service) GetSubcategoryByUUID(ctx context.Context, subcategoryUUID uuid.UUID) (*Subcategory, error) {
	// Try cache first
	if s.cache != nil {
		cacheKey := buildSubcategoryUUIDCacheKey(subcategoryUUID)
		cached, err := s.cache.Get(ctx, cacheKey)
		if err == nil && cached != "" {
			var subcategory Subcategory
			if err := json.Unmarshal([]byte(cached), &subcategory); err == nil {
				slog.InfoContext(ctx, "Cache HIT - returning subcategory from Redis", logger.Extra(map[string]any{
					"uuid": subcategoryUUID.String(),
				}))
				return &subcategory, nil
			}
		}
	}

	// Cache MISS - query database
	slog.InfoContext(ctx, "Cache MISS - loading subcategory from DB", logger.Extra(map[string]any{
		"uuid": subcategoryUUID.String(),
	}))

	sc, err := s.ent.Category.Query().
		Where(category.UUIDEQ(subcategoryUUID.String())).
		First(ctx)
	if err != nil {
		return nil, customerrors.ErrCategoryNotFound
	}

	// Check if it's actually a subcategory (has a parent)
	if sc.ParentID == 0 {
		return nil, errors.New("category is not a subcategory")
	}

	parsedUUID, err := uuid.Parse(sc.UUID)
	if err != nil {
		return nil, errors.New("invalid subcategory UUID")
	}

	result := &Subcategory{
		ID:          sc.ID,
		ParentID:    sc.ParentID,
		UUID:        parsedUUID,
		Slug:        sc.Slug,
		Label:       sc.Label,
		Description: sc.Description,
		CreatedBy:   sc.CreatedBy,
		UpdatedBy:   &sc.UpdatedBy,
		ApprovedBy:  &sc.ApprovedBy,
		DeletedBy:   &sc.DeletedBy,
		CreatedAt:   sc.CreatedAt,
		UpdatedAt:   sc.UpdatedAt,
		ApprovedAt:  &sc.ApprovedAt,
		DeletedAt:   &sc.DeletedAt,
		Status:      string(sc.Status),
		Meta:        sc.Meta,
	}

	// Cache the result (24 hours TTL)
	if s.cache != nil {
		cacheKey := buildSubcategoryUUIDCacheKey(subcategoryUUID)
		if err := s.cache.SetJSON(ctx, cacheKey, result, 24*time.Hour); err != nil {
			slog.ErrorContext(ctx, "Failed to cache subcategory", logger.Extra(map[string]any{
				"error": err.Error(),
			}))
		}
	}

	return result, nil
}

func buildSubcategoryIDCacheKey(id int) string {
	return "subcategory:id:" + strconv.Itoa(id)
}

func buildSubcategoryUUIDCacheKey(uuid uuid.UUID) string {
	return "subcategory:uuid:" + uuid.String()
}
