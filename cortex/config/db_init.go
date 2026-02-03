package config

import (
	"database/sql"
	"fmt"
	"log/slog"
	"net/url"
	"strings"

	_ "github.com/lib/pq"
)

// EnsureDatabaseExists checks if the database exists and creates it if it doesn't
func EnsureDatabaseExists(driver, dsn string) error {
	if driver != "postgres" {
		// Only handle postgres for now
		return nil
	}

	// Parse the DSN to extract database name and connection details
	parsedDSN, err := url.Parse(dsn)
	if err != nil {
		return fmt.Errorf("failed to parse DSN: %w", err)
	}

	// Extract database name from path
	dbName := strings.TrimPrefix(parsedDSN.Path, "/")
	if dbName == "" {
		return fmt.Errorf("no database name found in DSN")
	}

	// Extract database name without query parameters
	if idx := strings.Index(dbName, "?"); idx != -1 {
		dbName = dbName[:idx]
	}

	// Create a connection to postgres database (default database)
	parsedDSN.Path = "/postgres"
	postgresURL := parsedDSN.String()

	slog.Info("Checking if database exists", "database", dbName)

	// Connect to postgres database
	db, err := sql.Open(driver, postgresURL)
	if err != nil {
		return fmt.Errorf("failed to connect to postgres database: %w", err)
	}
	defer db.Close()

	// Check if database exists
	var exists bool
	query := "SELECT EXISTS(SELECT 1 FROM pg_database WHERE datname = $1)"
	err = db.QueryRow(query, dbName).Scan(&exists)
	if err != nil {
		return fmt.Errorf("failed to check if database exists: %w", err)
	}

	if exists {
		slog.Info("Database already exists", "database", dbName)
		return nil
	}

	// Create the database
	slog.Info("Creating database", "database", dbName)
	createQuery := fmt.Sprintf("CREATE DATABASE %s", dbName)
	_, err = db.Exec(createQuery)
	if err != nil {
		return fmt.Errorf("failed to create database: %w", err)
	}

	slog.Info("Database created successfully", "database", dbName)
	return nil
}
