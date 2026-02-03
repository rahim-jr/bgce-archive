package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "postal",
	Short: "Postal - Archive Posts Microservice",
	Long:  `A Content Management Service for structured knowledge posts under categories and subcategories.`,
}

func Execute() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	rootCmd.AddCommand(restCmd)
}
