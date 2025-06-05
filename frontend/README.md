# Chess Tracker Frontend

Frontend React moderne pour l'application Chess Tracker, permettant de visualiser les statistiques des joueurs Chess.com.

## 🚀 Fonctionnalités

- **Recherche de joueurs** : Trouvez n'importe quel joueur Chess.com
- **Profils détaillés** : Visualisez les informations complètes des joueurs
- **Statistiques par catégorie** : Rapid, Blitz, Bullet, Daily
- **Historique des parties** : Consultez les parties récentes
- **Comparaison de joueurs** : Comparez les statistiques de deux joueurs
- **Interface moderne** : Design élégant avec Material-UI et animations

## 📦 Installation

1. Cloner le repository
```bash
git clone [votre-repo]
cd chess-tracker-frontend
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer .env avec l'URL de votre API backend
```

4. Lancer le serveur de développement
```bash
npm run dev
```

## 🛠️ Technologies utilisées

- **React 18** : Framework UI
- **Vite** : Build tool ultra-rapide
- **Material-UI 5** : Composants UI modernes
- **React Query** : Gestion du cache et des requêtes
- **React Router** : Navigation
- **Axios** : Client HTTP
- **Framer Motion** : Animations fluides
- **Date-fns** : Formatage des dates

## 📁 Structure du projet

```
src/
├── api/          # Client API et endpoints
├── components/   # Composants réutilisables
├── hooks/        # Custom hooks React Query
├── pages/        # Pages de l'application
├── theme/        # Configuration du thème MUI
└── utils/        # Fonctions utilitaires
```

## 🎨 Personnalisation

### Thème
Le thème peut être modifié dans `src/theme/theme.js`. Les couleurs principales sont basées sur le vert de Chess.com.

### Animations
Les animations utilisent Framer Motion et peuvent être ajustées dans chaque composant.

## 📱 Responsive Design

L'application est entièrement responsive et s'adapte à tous les écrans :
- Mobile : Navigation par menu burger
- Tablette : Layout adaptatif
- Desktop : Experience complète

## 🚀 Build pour la production

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`.

## 🔧 Configuration du proxy

Le proxy de développement est configuré dans `vite.config.js` pour rediriger les appels API vers le backend Go.

## 📈 Performances

- Code splitting automatique
- Lazy loading des routes
- Optimisation des images
- Cache des requêtes avec React Query
