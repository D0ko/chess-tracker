import { Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { formatDate } from '../../utils/formatters';

const RatingChart = ({ stats, username }) => {
  if (!stats) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary" align="center">
            Aucune donnée de classement disponible
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Préparer les données pour le graphique
  const prepareChartData = () => {
    const series = [];
    const colors = {
      chess_rapid: '#2196f3',
      chess_blitz: '#ff9800',
      chess_bullet: '#f44336',
      chess_daily: '#4caf50',
    };

    const gameTypes = [
      { key: 'chess_rapid', label: 'Rapid' },
      { key: 'chess_blitz', label: 'Blitz' },
      { key: 'chess_bullet', label: 'Bullet' },
      { key: 'chess_daily', label: 'Daily' },
    ];

    gameTypes.forEach((type) => {
      const typeStats = stats[type.key];
      if (typeStats?.last?.rating) {
        series.push({
          label: type.label,
          data: [typeStats.last.rating],
          color: colors[type.key],
        });
      }
    });

    return series;
  };

  const chartData = prepareChartData();

  if (chartData.length === 0) {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" color="text.secondary" align="center">
            Aucune donnée de classement disponible
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Pour l'instant, on affiche juste les ratings actuels sous forme de barres
  // Dans une vraie app, on récupérerait l'historique des ratings
  const currentRatings = chartData.map(s => s.data[0]);
  const labels = chartData.map(s => s.label);

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Classements actuels
        </Typography>
        <Box sx={{ width: '100%', height: 400 }}>
          <LineChart
            series={[
              {
                data: currentRatings,
                label: username,
                color: '#81b64c',
              },
            ]}
            xAxis={[
              {
                data: labels,
                scaleType: 'point',
              },
            ]}
            yAxis={[
              {
                min: Math.min(...currentRatings) - 100,
                max: Math.max(...currentRatings) + 100,
              },
            ]}
            height={350}
            margin={{ left: 50, right: 20, top: 20, bottom: 30 }}
            grid={{ horizontal: true, vertical: true }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
          Vue d'ensemble des classements par catégorie
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RatingChart;