package chess

import (
	"chess-tracker/internal/models"
	"fmt"
)

type Service struct {
	client *Client
}

func NewService(client *Client) *Service {
	return &Service{
		client: client,
	}
}

// GetPlayer récupère les informations d'un joueur
func (s *Service) GetPlayer(username string) (*models.Player, error) {
	var player models.Player
	endpoint := fmt.Sprintf("/player/%s", username)

	if err := s.client.get(endpoint, &player); err != nil {
		return nil, fmt.Errorf("erreur récupération joueur: %w", err)
	}

	return &player, nil
}

// GetPlayerStats récupère les statistiques d'un joueur
func (s *Service) GetPlayerStats(username string) (*models.Stats, error) {
	var stats models.Stats
	endpoint := fmt.Sprintf("/player/%s/stats", username)

	if err := s.client.get(endpoint, &stats); err != nil {
		return nil, fmt.Errorf("erreur récupération stats: %w", err)
	}

	return &stats, nil
}

// GetRecentGames récupère les parties récentes d'un joueur
func (s *Service) GetRecentGames(username string) ([]models.Game, error) {
	// Structure pour l'API Chess.com
	type Archives struct {
		Archives []string `json:"archives"`
	}

	type MonthlyGames struct {
		Games []models.Game `json:"games"`
	}

	// Récupérer la liste des archives
	var archives Archives
	archivesEndpoint := fmt.Sprintf("/player/%s/games/archives", username)
	if err := s.client.get(archivesEndpoint, &archives); err != nil {
		return nil, fmt.Errorf("erreur récupération archives: %w", err)
	}

	if len(archives.Archives) == 0 {
		return []models.Game{}, nil
	}

	// Récupérer les parties du dernier mois
	lastArchive := archives.Archives[len(archives.Archives)-1]

	// Extraire l'endpoint de l'URL complète
	// Ex: "https://api.chess.com/pub/player/username/games/2024/01" -> "/player/username/games/2024/01"
	endpoint := lastArchive[len("https://api.chess.com/pub"):]

	var monthlyGames MonthlyGames
	if err := s.client.get(endpoint, &monthlyGames); err != nil {
		return nil, fmt.Errorf("erreur récupération parties: %w", err)
	}

	// Retourner les 20 dernières parties
	games := monthlyGames.Games
	if len(games) > 20 {
		games = games[len(games)-20:]
	}

	return games, nil
}

// GetPlayerRanking récupère le classement d'un joueur
func (s *Service) GetPlayerRanking(username string) (map[string]interface{}, error) {
	stats, err := s.GetPlayerStats(username)
	if err != nil {
		return nil, err
	}

	ranking := make(map[string]interface{})

	// Extraire les classements actuels
	if stats.ChessRapid != nil && stats.ChessRapid.Last != nil {
		ranking["rapid"] = stats.ChessRapid.Last.Rating
	}
	if stats.ChessBlitz != nil && stats.ChessBlitz.Last != nil {
		ranking["blitz"] = stats.ChessBlitz.Last.Rating
	}
	if stats.ChessBullet != nil && stats.ChessBullet.Last != nil {
		ranking["bullet"] = stats.ChessBullet.Last.Rating
	}
	if stats.ChessDaily != nil && stats.ChessDaily.Last != nil {
		ranking["daily"] = stats.ChessDaily.Last.Rating
	}

	return ranking, nil
}
