package utils

import (
	"time"

	"github.com/kataras/iris/v12"
)

// APIResponse structure standard pour les réponses API
type APIResponse struct {
	Success bool        `json:"success"`
	Data    interface{} `json:"data,omitempty"`
	Error   *APIError   `json:"error,omitempty"`
	Meta    *Meta       `json:"meta,omitempty"`
}

// APIError structure pour les erreurs
type APIError struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Details string `json:"details,omitempty"`
}

// Meta informations supplémentaires
type Meta struct {
	Page       int    `json:"page,omitempty"`
	PerPage    int    `json:"per_page,omitempty"`
	Total      int    `json:"total,omitempty"`
	TotalPages int    `json:"total_pages,omitempty"`
	Timestamp  int64  `json:"timestamp"`
	Version    string `json:"version,omitempty"`
}

// SendSuccess envoie une réponse de succès
func SendSuccess(ctx iris.Context, data interface{}, meta *Meta) {
	if meta == nil {
		meta = &Meta{}
	}
	meta.Timestamp = time.Now().Unix()

	response := APIResponse{
		Success: true,
		Data:    data,
		Meta:    meta,
	}

	ctx.JSON(response)
}

// SendError envoie une réponse d'erreur
func SendError(ctx iris.Context, statusCode int, code string, message string, details string) {
	response := APIResponse{
		Success: false,
		Error: &APIError{
			Code:    code,
			Message: message,
			Details: details,
		},
		Meta: &Meta{
			Timestamp: time.Now().Unix(),
		},
	}

	ctx.StatusCode(statusCode)
	ctx.JSON(response)
}

// Common error responses
func SendBadRequest(ctx iris.Context, message string) {
	SendError(ctx, iris.StatusBadRequest, "BAD_REQUEST", message, "")
}

func SendUnauthorized(ctx iris.Context, message string) {
	SendError(ctx, iris.StatusUnauthorized, "UNAUTHORIZED", message, "")
}

func SendForbidden(ctx iris.Context, message string) {
	SendError(ctx, iris.StatusForbidden, "FORBIDDEN", message, "")
}

func SendNotFound(ctx iris.Context, resource string) {
	message := resource + " non trouvé"
	SendError(ctx, iris.StatusNotFound, "NOT_FOUND", message, "")
}

func SendInternalError(ctx iris.Context, details string) {
	SendError(ctx, iris.StatusInternalServerError, "INTERNAL_ERROR", "Une erreur interne s'est produite", details)
}

// GetPaginationParams récupère les paramètres de pagination
func GetPaginationParams(ctx iris.Context) (page int, perPage int) {
	page = ctx.URLParamIntDefault("page", 1)
	perPage = ctx.URLParamIntDefault("per_page", 20)

	if page < 1 {
		page = 1
	}
	if perPage < 1 {
		perPage = 20
	}
	if perPage > 100 {
		perPage = 100
	}

	return page, perPage
}

// CalculatePaginationMeta calcule les métadonnées de pagination
func CalculatePaginationMeta(page, perPage, total int) *Meta {
	totalPages := (total + perPage - 1) / perPage

	return &Meta{
		Page:       page,
		PerPage:    perPage,
		Total:      total,
		TotalPages: totalPages,
		Timestamp:  time.Now().Unix(),
	}
}

// GetQueryParam récupère un paramètre de requête avec une valeur par défaut
func GetQueryParam(ctx iris.Context, key string, defaultValue string) string {
	value := ctx.URLParam(key)
	if value == "" {
		return defaultValue
	}
	return value
}

// ValidateUsername valide le format d'un nom d'utilisateur Chess.com
func ValidateUsername(username string) bool {
	if len(username) < 3 || len(username) > 25 {
		return false
	}

	// Chess.com autorise les lettres, chiffres, underscores et tirets
	for _, char := range username {
		if !((char >= 'a' && char <= 'z') ||
			(char >= 'A' && char <= 'Z') ||
			(char >= '0' && char <= '9') ||
			char == '_' || char == '-') {
			return false
		}
	}

	return true
}

// ParseTimeControl parse le contrôle de temps Chess.com (ex: "600" = 10 minutes)
func ParseTimeControl(timeControl string) string {
	// Conversion simple pour l'affichage
	if len(timeControl) > 0 {
		// Format: "600" = 600 secondes = 10 minutes
		// Format: "180+2" = 3 minutes + 2 secondes d'incrément
		return timeControl
	}
	return "unknown"
}
