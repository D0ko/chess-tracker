package config

import (
	"os"
)

type Config struct {
	ChessAPIBaseURL string
	Port            string
	Environment     string
}

func New() *Config {
	return &Config{
		ChessAPIBaseURL: getEnv("CHESS_API_BASE_URL", "https://api.chess.com/pub"),
		Port:            getEnv("PORT", "8080"),
		Environment:     getEnv("ENVIRONMENT", "development"),
	}
}

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return defaultValue
}
