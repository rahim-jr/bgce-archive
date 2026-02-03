package handlers

import (
	"postal/post"
	"postal/post_version"
)

type Handlers struct {
	PostService        post.Service
	PostVersionService post_version.Repository
}

func NewHandlers(postService post.Service, versionRepo post_version.Repository) *Handlers {
	return &Handlers{
		PostService:        postService,
		PostVersionService: versionRepo,
	}
}

type SuccessResponse struct {
	Status  bool        `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

type ErrorResponse struct {
	Status  bool   `json:"status"`
	Message string `json:"message"`
	Error   string `json:"error,omitempty"`
}

type PaginatedResponse struct {
	Status  bool        `json:"status"`
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
	Meta    MetaData    `json:"meta"`
}

type MetaData struct {
	Total  int64 `json:"total"`
	Limit  int   `json:"limit"`
	Offset int   `json:"offset"`
}
