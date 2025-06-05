import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Timer as TimerIcon,
  FlashOn as FlashIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { formatRating, formatWinRate } from '../../utils/formatters';
import { motion } from 'framer-motion';

const PlayerStats = ({ stats }) => {
  if (!stats) return null;

  const gameTypes = [
    { key: 'chess_rapid', label: 'Rapid', icon: <TimerIcon /> },
    { key: 'chess_blitz', label: 'Blitz', icon: <SpeedIcon /> },
    { key: 'chess_bullet', label: 'Bullet', icon: <FlashIcon /> },
    { key: 'chess_daily', label: 'Daily', icon: <TodayIcon /> },
  ];

  const getStatsForType = (type) => {
    const typeStats = stats[type];
    if (!typeStats?.last) return null;

    const { win, loss, draw } = typeStats.record;
    const total = win + loss + draw;
    const winRate = formatWinRate(win, loss, draw);

    return {
      rating: typeStats.last.rating,
      best: typeStats.best?.rating,
      games: total,
      winRate,
      win,
      loss,
      draw,
    };
  };

  return (
    <Grid container spacing={2}>
      {gameTypes.map((type, index) => {
        const typeStats = getStatsForType(type.key);
        if (!typeStats) return null;

        return (
          <Grid item xs={12} sm={6} key={type.key}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ color: 'primary.main', mr: 1 }}>
                      {type.icon}
                    </Box>
                    <Typography variant="h6">{type.label}</Typography>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h3" sx={{ fontWeight: 600 }}>
                      {formatRating(typeStats.rating)}
                    </Typography>
                    {typeStats.best && (
                      <Typography variant="body2" color="text.secondary">
                        Meilleur: {formatRating(typeStats.best)}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">Taux de victoire</Typography>
                      <Typography variant="body2" color="primary">
                        {typeStats.winRate}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={parseFloat(typeStats.winRate)}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Chip
                      label={`V: ${typeStats.win}`}
                      size="small"
                      color="success"
                    />
                    <Chip
                      label={`N: ${typeStats.draw}`}
                      size="small"
                    />
                    <Chip
                      label={`D: ${typeStats.loss}`}
                      size="small"
                      color="error"
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default PlayerStats;