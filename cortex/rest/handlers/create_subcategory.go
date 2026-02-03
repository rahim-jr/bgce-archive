package handlers

import (
	"encoding/json"
	"log/slog"
	"net/http"

	customerrors "cortex/pkg/custom_errors"
	"cortex/rest/middlewares"
	"cortex/rest/utils"
	"cortex/subcategory"
)

type CreateSubcategoryRequest struct {
	Slug        string                 `json:"slug" validate:"required"`
	Label       string                 `json:"label" validate:"required"`
	Description string                 `json:"description,omitempty"`
	ParentID    int                    `json:"parent_id" validate:"required"`
	Meta        map[string]interface{} `json:"meta,omitempty"`
}

func (h *Handlers) CreateSubcategory(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	var req CreateSubcategoryRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		slog.Error("Failed to decode request body", "error", err.Error())
		utils.SendError(w, http.StatusBadRequest, "Failed to decode request body: "+err.Error(), nil)
		return
	}

	// Validate request
	if err := utils.Validate(req); err != nil {
		slog.Error("Validation failed", "error", err.Error())
		utils.SendError(w, http.StatusBadRequest, err.Error(), nil)
		return
	}

	userID := middlewares.GetUserId(r)
	if userID == 0 {
		utils.SendError(w, http.StatusUnauthorized, "User not authenticated", nil)
		return
	}

	slog.Info("Creating subcategory", "slug", req.Slug, "label", req.Label, "parent_id", req.ParentID, "user_id", userID)

	subcategoryParams := subcategory.CreateSubcategoryParams{
		Slug:        req.Slug,
		Label:       req.Label,
		Description: req.Description,
		CreatorID:   userID,
		ParentID:    req.ParentID,
		Meta:        req.Meta,
	}

	err := h.SubcategoryService.CreateSubcategory(ctx, subcategoryParams)
	if err != nil {
		if err == customerrors.ErrSlugExists {
			utils.SendError(w, http.StatusConflict, "Subcategory with this slug already exists", nil)
			return
		}
		// Log and return the actual error message for debugging
		slog.Error("Failed to create subcategory", "error", err.Error())
		utils.SendError(w, http.StatusInternalServerError, err.Error(), nil)
		return
	}

	utils.SendJson(w, http.StatusCreated, SuccessResponse{
		Message: "Subcategory created successfully",
		Status:  true,
		Data:    nil,
	})
}
