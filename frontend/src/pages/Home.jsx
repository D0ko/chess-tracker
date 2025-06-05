import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  InputAdornment,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  TrendingUp as TrendingUpIcon,
  Groups as GroupsIcon,
  Timeline as TimelineIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Home = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      navigate(`/player/${searchValue.trim()}`);
    }
  };

  const popularPlayers = [
    { username: 'hikaru', title: 'GM', rating: 3242 },
    { username: 'magnuscarlsen', title: 'GM', rating: 3358 },
    { username: 'fabianocaruana', title: 'GM', rating: 3163 },
    { username: 'firouzja2003', title: 'GM', rating: 3191 },
    { username: 'anishgiri', title: 'GM', rating: 3089 },
    { username: 'levonAronian', title: 'GM', rating: 3098 },
  ];

  const features = [
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Statistiques détaillées',
      description: 'Analysez les performances par catégorie de jeu',
    },
    {
      icon: <TimelineIcon sx={{ fontSize: 40 }} />,
      title: 'Évolution du classement',
      description: 'Suivez la progression des joueurs dans le temps',
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      title: 'Comparaison de joueurs',
      description: 'Comparez les statistiques de plusieurs joueurs',
    },
    {
      icon: <TrophyIcon sx={{ fontSize: 40 }} />,
      title: 'Historique des parties',
      description: 'Consultez les dernières parties jouées',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #81b64c 30%, #a5d373 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Chess Tracker
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
            Suivez et analysez les statistiques des joueurs Chess.com
          </Typography>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              maxWidth: 600,
              mx: 'auto',
              display: 'flex',
              gap: 2,
            }}
          >
            <TextField
              fullWidth
              size="large"
              placeholder="Entrez un nom d'utilisateur Chess.com..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                px: 4,
                borderRadius: 2,
                background: 'linear-gradient(45deg, #81b64c 30%, #a5d373 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #5a8035 30%, #81b64c 90%)',
                },
              }}
            >
              Rechercher
            </Button>
          </Box>
        </Box>
      </motion.div>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Fonctionnalités
        </Typography>
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(129, 182, 76, 0.1) 0%, rgba(38, 37, 34, 0.8) 100%)',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 3 }}>
                    <Box sx={{ color: 'primary.main', mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Joueurs populaires
        </Typography>
        <Grid container spacing={2}>
          {popularPlayers.map((player, index) => (
            <Grid item xs={12} sm={6} md={4} key={player.username}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Card>
                  <CardActionArea
                    onClick={() => navigate(`/player/${player.username}`)}
                    sx={{ p: 2 }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="h6">
                            {player.username}
                          </Typography>
                          {player.title && (
                            <Chip
                              label={player.title}
                              size="small"
                              color="primary"
                              sx={{ fontWeight: 600 }}
                            />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          ELO: {player.rating}
                        </Typography>
                      </Box>
                      <TrophyIcon sx={{ color: 'primary.main' }} />
                    </Box>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;