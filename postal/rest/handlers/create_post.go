package handlers

import (
	"encoding/json"
	"net/http"

	"postal/post"
	"postal/rest/middlewares"
)

func (h *Handlers) CreatePost(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	// Get user ID from middleware
	userID := middlewares.GetUserID(r)
	if userID == 0 {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	var req post.CreatePostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(ErrorResponse{
			Status:  false,
			Message: "Invalid request body",
			Error:   err.Error(),
		})
		return
	}

	postResp, err := h.PostService.CreatePost(ctx, req, userID)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		json.NewEncoder(w).Encode(ErrorResponse{
			Status:  false,
			Message: "Failed to create post",
			Error:   err.Error(),
		})
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(SuccessResponse{
		Status:  true,
		Message: "Post created successfully",
		Data:    postResp,
	})
}
