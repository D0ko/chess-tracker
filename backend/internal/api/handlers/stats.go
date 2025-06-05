package handlers

import (
	"chess-tracker/internal/services/chess"

	"github.com/kataras/iris/v12"
)

type StatsHandler struct {
	chessService *chess.Service
}

func NewStatsHandler(chessService *chess.Service) *StatsHandler {
	return &StatsHandler{
		chessService: chessService,
	}
}

// GetPlayerStats récupère toutes les statistiques d'un joueur
func (h *StatsHandler) GetPlayerStats(ctx iris.Context) {
	username := ctx.Params().Get("username")
	if username == "" {
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{
			"error": "username requis",
		})
		return
	}

	stats, err := h.chessService.GetPlayerStats(username)
	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.JSON(iris.Map{
			"error": err.Error(),
		})
		return
	}

	ctx.JSON(stats)
}

// GetPlayerSummary récupère un résumé complet d'un joueur
func (h *StatsHandler) GetPlayerSummary(ctx iris.Context) {
	username := ctx.Params().Get("username")
	if username == "" {
		ctx.StatusCode(iris.StatusBadRequest)
		ctx.JSON(iris.Map{
			"error": "username requis",
		})
		return
	}

	// Récupérer les informations du joueur
	player, err := h.chessService.GetPlayer(username)
	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.JSON(iris.Map{
			"error": err.Error(),
		})
		return
	}

	// Récupérer les statistiques
	stats, err := h.chessService.GetPlayerStats(username)
	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.JSON(iris.Map{
			"error": err.Error(),
		})
		return
	}

	// Récupérer les classements
	ranking, err := h.chessService.GetPlayerRanking(username)
	if err != nil {
		ctx.StatusCode(iris.StatusInternalServerError)
		ctx.JSON(iris.Map{
			"error": err.Error(),
		})
		return
	}

	// Construire le résumé
	summary := iris.Map{
		"player":  player,
		"stats":   stats,
		"ranking": ranking,
	}

	ctx.JSON(summary)
}
