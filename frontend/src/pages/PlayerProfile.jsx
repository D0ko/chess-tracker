import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import { usePlayerSummary } from '../hooks/useStats';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import PlayerCard from '../components/player/PlayerCard';
import PlayerStats from '../components/player/PlayerStats';
import GamesList from '../components/games/GamesList';
import RatingChart from '../components/player/RatingChart';

const PlayerProfile = () => {
  const { username } = useParams();
  const [tabValue, setTabValue] = useState(0);
  
  const { data, isLoading, error, refetch } = usePlayerSummary(username);

  if (isLoading) {
    return <LoadingSpinner message={`Chargement du profil de ${username}...`} />;
  }

  if (error) {
    return <ErrorAlert error={error} onRetry={refetch} />;
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <PlayerCard player={data?.player} />
          
          <Box sx={{ mt: 3 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Classements actuels
              </Typography>
              {data?.ranking && Object.entries(data.ranking).map(([type, rating]) => (
                <Box
                  key={type}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    py: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <Typography variant="body1" sx={{ textTransform: 'capitalize' }}>
                    {type}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold" color="primary">
                    {rating}
                  </Typography>
                </Box>
              ))}
            </Paper>
          </Box>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab label="Statistiques" />
              <Tab label="Graphiques" />
              <Tab label="Parties récentes" />
            </Tabs>
          </Paper>

          {tabValue === 0 && (
            <PlayerStats stats={data?.stats} />
          )}

          {tabValue === 1 && (
            <RatingChart stats={data?.stats} username={username} />
          )}

          {tabValue === 2 && (
            <GamesList username={username} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlayerProfile;