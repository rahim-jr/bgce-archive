package domain

import (
	"time"

	"gorm.io/gorm"
)

type PostVersion struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`

	PostID     uint   `gorm:"not null;index" json:"post_id"`
	VersionNo  int    `gorm:"not null" json:"version_no"`
	Title      string `gorm:"type:varchar(500);not null" json:"title"`
	Content    string `gorm:"type:text;not null" json:"content"`
	Summary    string `gorm:"type:text" json:"summary"`
	EditedBy   uint   `gorm:"not null" json:"edited_by"`
	ChangeNote string `gorm:"type:text" json:"change_note"`
}

func (PostVersion) TableName() string {
	return "post_versions"
}
