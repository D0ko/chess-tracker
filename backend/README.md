# Chess.com Stats Tracker

Un backend Go utilisant Iris pour tracker les statistiques des joueurs Chess.com.

## Structure du projet

```
chess-tracker/
├── cmd/server/          # Point d'entrée de l'application
├── internal/            # Code privé de l'application
│   ├── api/            # Handlers et routes HTTP
│   ├── models/         # Structures de données
│   ├── services/       # Logique métier
│   └── config/         # Configuration
└── pkg/                # Code réutilisable
```

## Installation

1. Cloner le repository
2. Installer les dépendances :
```bash
go mod download
```

3. Copier le fichier `.env.example` en `.env` et configurer si nécessaire

4. Lancer le serveur :
```bash
go run cmd/server/main.go
```

## Endpoints API

### Informations joueur
- `GET /api/v1/players/{username}` - Informations du profil
- `GET /api/v1/players/{username}/ranking` - Classements du joueur
- `GET /api/v1/players/{username}/games` - Parties récentes

### Statistiques
- `GET /api/v1/stats/{username}` - Statistiques détaillées
- `GET /api/v1/stats/{username}/summary` - Résumé complet

### Santé
- `GET /health` - Vérification du statut du service

## Exemples d'utilisation

```bash
# Récupérer les infos d'un joueur
curl http://localhost:8080/api/v1/players/hikaru

# Récupérer les classements
curl http://localhost:8080/api/v1/players/hikaru/ranking

# Récupérer un résumé complet
curl http://localhost:8080/api/v1/stats/hikaru/summary
```

## Architecture Clean Code

- **Separation of Concerns** : Chaque package a une responsabilité unique
- **Dependency Injection** : Les services sont injectés dans les handlers
- **Interface-based design** : Facilite les tests et le découplage
- **Error handling** : Gestion centralisée des erreurs
- **Configuration** : Variables d'environnement pour la configuration

## Développement

Pour ajouter de nouvelles fonctionnalités :

1. Ajouter les modèles dans `internal/models`
2. Étendre le service Chess dans `internal/services/chess`
3. Créer les handlers dans `internal/api/handlers`
4. Ajouter les routes dans `internal/api/routes`

## Tests

```bash
go test ./...
```

## Production

Pour la production :
- Configurer les CORS correctement
- Ajouter un rate limiter
- Implémenter un cache (Redis)
- Ajouter des métriques (Prometheus)
- Logger structuré (Zap ou Logrus)
