package handlers

import (
	"net/http"

	"cortex/rest/utils"
	"cortex/subcategory"

	"github.com/google/uuid"
)

func (h *Handlers) GetSubCategoryList(w http.ResponseWriter, r *http.Request) {
	// Build filter from query parameters
	filter := subcategory.GetSubcategoryFilter{}
	if limit := r.URL.Query().Get("limit"); limit != "" {
		filter.Limit = parseIntPointer(limit)
	}
	if offset := r.URL.Query().Get("offset"); offset != "" {
		filter.Offset = parseIntPointer(offset)
	}
	if sortBy := r.URL.Query().Get("sort_by"); sortBy != "" {
		filter.SortBy = &sortBy
	}
	if sortOrder := r.URL.Query().Get("sort_order"); sortOrder != "" {
		filter.SortOrder = &sortOrder
	}
	if status := r.URL.Query().Get("status"); status != "" {
		filter.Status = &status
	}
	if id := r.URL.Query().Get("id"); id != "" {
		filter.ID = parseIntPointer(id)
	}
	if uuid := r.URL.Query().Get("uuid"); uuid != "" {
		filter.UUID = parseUUIDPointer(uuid)
	}
	if slug := r.URL.Query().Get("slug"); slug != "" {
		filter.Slug = &slug
	}
	if label := r.URL.Query().Get("label"); label != "" {
		filter.Label = &label
	}

	// Get parent UUID from query parameter (optional)
	parentUUIDStr := r.URL.Query().Get("parent_uuid")

	var subcategories []*subcategory.Subcategory
	var err error

	if parentUUIDStr != "" {
		// If parent_uuid is provided, get subcategories for that parent
		parentUUID, parseErr := uuid.Parse(parentUUIDStr)
		if parseErr != nil {
			utils.SendError(w, http.StatusBadRequest, "invalid parent_uuid format", nil)
			return
		}
		subcategories, err = h.SubcategoryService.GetSubcategoriesByParentID(r.Context(), parentUUID, filter)
	} else {
		// If parent_uuid is not provided, get all subcategories
		subcategories, err = h.SubcategoryService.GetAllSubcategories(r.Context(), filter)
	}

	if err != nil {
		utils.SendError(w, http.StatusInternalServerError, "failed to retrieve subcategories", err)
		return
	}

	response := SuccessResponse{
		Message: "Subcategories retrieved successfully",
		Data:    subcategories,
		Status:  true,
	}

	utils.SendJson(w, http.StatusOK, response)
}
