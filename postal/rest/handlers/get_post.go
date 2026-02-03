package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
)

func (h *Handlers) GetPostByID(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	idStr := r.PathValue("id")

	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ErrorResponse{
			Status:  false,
			Message: "Invalid post ID",
		})
		return
	}

	post, err := h.PostService.GetPostByID(ctx, uint(id))
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(ErrorResponse{
			Status:  false,
			Message: "Post not found",
			Error:   err.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(SuccessResponse{
		Status:  true,
		Message: "Post retrieved successfully",
		Data:    post,
	})
}

func (h *Handlers) GetPostBySlug(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()
	slug := r.PathValue("slug")

	post, err := h.PostService.GetPostBySlug(ctx, slug)
	if err != nil {
		w.WriteHeader(http.StatusNotFound)
		json.NewEncoder(w).Encode(ErrorResponse{
			Status:  false,
			Message: "Post not found",
			Error:   err.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(SuccessResponse{
		Status:  true,
		Message: "Post retrieved successfully",
		Data:    post,
	})
}
