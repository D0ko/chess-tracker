package handlers

import (
	"chess-tracker/internal/services/chess"
	"chess-tracker/pkg/utils"

	"github.com/kataras/iris/v12"
)

type PlayerHandler struct {
	chessService *chess.Service
}

func NewPlayerHandler(chessService *chess.Service) *PlayerHandler {
	return &PlayerHandler{
		chessService: chessService,
	}
}

// GetPlayer récupère les informations d'un joueur
func (h *PlayerHandler) GetPlayer(ctx iris.Context) {
	username := ctx.Params().Get("username")
	if username == "" {
		utils.SendBadRequest(ctx, "username requis")
		return
	}

	if !utils.ValidateUsername(username) {
		utils.SendBadRequest(ctx, "username invalide")
		return
	}

	player, err := h.chessService.GetPlayer(username)
	if err != nil {
		utils.SendInternalError(ctx, err.Error())
		return
	}

	utils.SendSuccess(ctx, player, nil)
}

// GetPlayerRanking récupère le classement d'un joueur
func (h *PlayerHandler) GetPlayerRanking(ctx iris.Context) {
	username := ctx.Params().Get("username")
	if username == "" {
		utils.SendBadRequest(ctx, "username requis")
		return
	}

	if !utils.ValidateUsername(username) {
		utils.SendBadRequest(ctx, "username invalide")
		return
	}

	ranking, err := h.chessService.GetPlayerRanking(username)
	if err != nil {
		utils.SendInternalError(ctx, err.Error())
		return
	}

	utils.SendSuccess(ctx, ranking, nil)
}

// GetRecentGames récupère les parties récentes d'un joueur
func (h *PlayerHandler) GetRecentGames(ctx iris.Context) {
	username := ctx.Params().Get("username")
	if username == "" {
		utils.SendBadRequest(ctx, "username requis")
		return
	}

	if !utils.ValidateUsername(username) {
		utils.SendBadRequest(ctx, "username invalide")
		return
	}

	games, err := h.chessService.GetRecentGames(username)
	if err != nil {
		utils.SendInternalError(ctx, err.Error())
		return
	}

	data := iris.Map{
		"games": games,
		"count": len(games),
	}

	utils.SendSuccess(ctx, data, nil)
}
