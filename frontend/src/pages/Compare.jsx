import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  CompareArrows as CompareIcon,
} from '@mui/icons-material';
import { usePlayerSummary } from '../hooks/useStats';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatRating } from '../utils/formatters';
import { motion } from 'framer-motion';

const Compare = () => {
  const [players, setPlayers] = useState(['', '']);
  const [searchValue, setSearchValue] = useState('');
  
  // Hooks pour chaque joueur
  const player1Query = usePlayerSummary(players[0], { enabled: !!players[0] });
  const player2Query = usePlayerSummary(players[1], { enabled: !!players[1] });

  const handleAddPlayer = (index) => {
    if (searchValue.trim()) {
      const newPlayers = [...players];
      newPlayers[index] = searchValue.trim();
      setPlayers(newPlayers);
      setSearchValue('');
    }
  };

  const handleRemovePlayer = (index) => {
    const newPlayers = [...players];
    newPlayers[index] = '';
    setPlayers(newPlayers);
  };

  const getStatValue = (playerData, gameType, stat) => {
    const stats = playerData?.stats?.[gameType];
    if (!stats) return null;

    switch (stat) {
      case 'rating':
        return stats.last?.rating;
      case 'best':
        return stats.best?.rating;
      case 'games':
        const { win, loss, draw } = stats.record || {};
        return (win || 0) + (loss || 0) + (draw || 0);
      case 'winRate':
        const record = stats.record || {};
        const total = (record.win || 0) + (record.loss || 0) + (record.draw || 0);
        if (total === 0) return 0;
        return Math.round((record.win / total) * 100);
      default:
        return null;
    }
  };

  const gameTypes = [
    { key: 'chess_rapid', label: 'Rapid' },
    { key: 'chess_blitz', label: 'Blitz' },
    { key: 'chess_bullet', label: 'Bullet' },
    { key: 'chess_daily', label: 'Daily' },
  ];

  const renderComparison = () => {
    if (!player1Query.data || !player2Query.data) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            Sélectionnez deux joueurs pour commencer la comparaison
          </Typography>
        </Box>
      );
    }

    const player1 = player1Query.data;
    const player2 = player2Query.data;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Grid container spacing={3}>
          {/* En-tête avec les profils */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={player1.player?.avatar}
                        sx={{ width: 60, height: 60 }}
                      >
                        {player1.player?.username[0]?.toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="h5">
                          {player1.player?.username}
                        </Typography>
                        {player1.player?.title && (
                          <Chip
                            label={player1.player.title}
                            size="small"
                            color="primary"
                          />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={2} sx={{ textAlign: 'center' }}>
                    <CompareIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Grid>
                  <Grid item xs={5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end' }}>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h5">
                          {player2.player?.username}
                        </Typography>
                        {player2.player?.title && (
                          <Chip
                            label={player2.player.title}
                            size="small"
                            color="primary"
                          />
                        )}
                      </Box>
                      <Avatar
                        src={player2.player?.avatar}
                        sx={{ width: 60, height: 60 }}
                      >
                        {player2.player?.username[0]?.toUpperCase()}
                      </Avatar>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Tableau de comparaison */}
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Catégorie</TableCell>
                    <TableCell align="center">{player1.player?.username}</TableCell>
                    <TableCell align="center">{player2.player?.username}</TableCell>
                    <TableCell align="center">Différence</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {gameTypes.map((gameType) => {
                    const p1Rating = getStatValue(player1, gameType.key, 'rating');
                    const p2Rating = getStatValue(player2, gameType.key, 'rating');
                    const p1WinRate = getStatValue(player1, gameType.key, 'winRate');
                    const p2WinRate = getStatValue(player2, gameType.key, 'winRate');

                    if (!p1Rating && !p2Rating) return null;

                    const diff = (p1Rating || 0) - (p2Rating || 0);

                    return (
                      <React.Fragment key={gameType.key}>
                        <TableRow>
                          <TableCell rowSpan={2}>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {gameType.label}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              variant="h6"
                              color={diff > 0 ? 'success.main' : 'text.primary'}
                            >
                              {formatRating(p1Rating)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography
                              variant="h6"
                              color={diff < 0 ? 'success.main' : 'text.primary'}
                            >
                              {formatRating(p2Rating)}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={diff > 0 ? `+${diff}` : diff}
                              color={diff > 0 ? 'success' : diff < 0 ? 'error' : 'default'}
                              size="small"
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center">
                            <Typography variant="body2" color="text.secondary">
                              Taux: {p1WinRate}%
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" color="text.secondary">
                              Taux: {p2WinRate}%
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" color="text.secondary">
                              {p1WinRate - p2WinRate > 0 ? '+' : ''}{p1WinRate - p2WinRate}%
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </motion.div>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Comparer des joueurs
      </Typography>
      <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
        Comparez les statistiques de deux joueurs Chess.com
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {players.map((player, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Joueur {index + 1}
                </Typography>
                {player ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={player}
                      onDelete={() => handleRemovePlayer(index)}
                      deleteIcon={<CloseIcon />}
                    />
                    {index === 0 ? player1Query.isLoading : player2Query.isLoading && (
                      <LoadingSpinner />
                    )}
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Nom d'utilisateur"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddPlayer(index);
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      onClick={() => handleAddPlayer(index)}
                      startIcon={<AddIcon />}
                    >
                      Ajouter
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {renderComparison()}
    </Container>
  );
};

export default Compare;