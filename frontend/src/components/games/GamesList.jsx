import { Box, Typography } from '@mui/material';
import { usePlayerGames } from '../../hooks/usePlayer';
import LoadingSpinner from '../common/LoadingSpinner';
import ErrorAlert from '../common/ErrorAlert';
import GameCard from './GameCard';

const GamesList = ({ username }) => {
  const { data, isLoading, error, refetch } = usePlayerGames(username);

  if (isLoading) {
    return <LoadingSpinner message="Chargement des parties..." />;
  }

  if (error) {
    return <ErrorAlert error={error} onRetry={refetch} />;
  }

  if (!data?.games || data.games.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="body1" color="text.secondary">
          Aucune partie récente trouvée
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
        {data.count} parties récentes
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {data.games.map((game, index) => (
          <GameCard key={index} game={game} currentUser={username} />
        ))}
      </Box>
    </Box>
  );
};

export default GamesList;