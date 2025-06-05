package routes

import (
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/middleware/logger"
	"github.com/kataras/iris/v12/middleware/recover"

	"chess-tracker/internal/api/handlers"
	"chess-tracker/internal/api/middleware"
	"chess-tracker/internal/services/chess"
)

func Setup(app *iris.Application, chessService *chess.Service) {
	// Middleware CORS personnalisé
	app.Use(middleware.CORS())

	// Logger middleware
	app.Use(logger.New())

	// Récupération des erreurs
	app.Use(recover.New())

	// Initialiser les handlers
	playerHandler := handlers.NewPlayerHandler(chessService)
	statsHandler := handlers.NewStatsHandler(chessService)

	// Route de santé
	app.Get("/health", func(ctx iris.Context) {
		ctx.JSON(iris.Map{
			"status":  "ok",
			"service": "chess-tracker",
		})
	})

	// Groupe API v1
	v1 := app.Party("/api/v1")
	{
		// Routes Player
		players := v1.Party("/players")
		{
			players.Get("/{username}", playerHandler.GetPlayer)
			players.Get("/{username}/ranking", playerHandler.GetPlayerRanking)
			players.Get("/{username}/games", playerHandler.GetRecentGames)
		}

		// Routes Stats
		stats := v1.Party("/stats")
		{
			stats.Get("/{username}", statsHandler.GetPlayerStats)
			stats.Get("/{username}/summary", statsHandler.GetPlayerSummary)
		}
	}
}
