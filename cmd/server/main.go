package main

import (
	"chess-tracker/internal/api/routes"
	"chess-tracker/internal/config"
	"chess-tracker/internal/services/chess"
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/kataras/iris/v12"
)

func main() {
	// Charger les variables d'environnement
	if err := godotenv.Load(); err != nil {
		log.Println("Pas de fichier .env trouvé")
	}

	// Initialiser la configuration
	cfg := config.New()

	// Créer le client Chess.com
	chessClient := chess.NewClient(cfg.ChessAPIBaseURL)
	chessService := chess.NewService(chessClient)

	// Créer l'application Iris
	app := iris.New()

	// Configuration de base
	app.Logger().SetLevel("info")

	// Configurer les routes
	routes.Setup(app, chessService)

	// Démarrer le serveur
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	app.Listen(":" + port)
}
