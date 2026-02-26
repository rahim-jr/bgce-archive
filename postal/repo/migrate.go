package repo

import (
	"log"

	"postal/domain"

	"gorm.io/gorm"
)

func AutoMigrate(db *gorm.DB) error {
	log.Println("🔄 Running database migrations...")

	err := db.AutoMigrate(
		&domain.Post{},
		&domain.PostVersion{},
	)
	if err != nil {
		log.Printf("❌ Migration failed: %v", err)
		return err
	}

	log.Println("✅ Migrations completed successfully")
	return nil
}
