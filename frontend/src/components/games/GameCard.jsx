import {
  Card,
  CardContent,
  Box,
  Typography,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Timer as TimerIcon,
  EmojiEvents as TrophyIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { formatRelativeTime, getTimeControlLabel } from '../../utils/formatters';
import { motion } from 'framer-motion';

const GameCard = ({ game, currentUser }) => {
  const [expanded, setExpanded] = useState(false);

  const isWhite = game.white?.username?.toLowerCase() === currentUser?.toLowerCase();
  const playerColor = isWhite ? 'white' : 'black';
  const opponentColor = isWhite ? 'black' : 'white';
  const player = game[playerColor];
  const opponent = game[opponentColor];

  const getResultColor = (result) => {
    switch (result) {
      case 'win':
        return 'success';
      case 'checkmated':
      case 'resigned':
      case 'timeout':
      case 'abandoned':
        return 'error';
      default:
        return 'default';
    }
  };

  const getResultLabel = (result) => {
    switch (result) {
      case 'win':
        return 'Victoire';
      case 'checkmated':
        return 'Échec et mat';
      case 'resigned':
        return 'Abandon';
      case 'timeout':
        return 'Temps écoulé';
      case 'stalemate':
        return 'Pat';
      case 'agreed':
        return 'Nulle';
      case 'repetition':
        return 'Répétition';
      case 'insufficient':
        return 'Matériel insuffisant';
      default:
        return result;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: playerColor === 'white' ? 'white' : 'black',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                  <Typography variant="body1">
                    {player?.username} ({player?.rating})
                  </Typography>
                  <Chip
                    label={getResultLabel(player?.result)}
                    size="small"
                    color={getResultColor(player?.result)}
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  vs
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: opponentColor === 'white' ? 'white' : 'black',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                  <Typography variant="body1">
                    {opponent?.username} ({opponent?.rating})
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TimerIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {getTimeControlLabel(game.time_control)}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {formatRelativeTime(game.end_time)}
                </Typography>
                {game.rated && (
                  <Chip label="Classée" size="small" variant="outlined" />
                )}
              </Box>
            </Box>

            <IconButton
              onClick={() => setExpanded(!expanded)}
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Box>

          <Collapse in={expanded}>
            <Box sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                Lien vers la partie:
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href={game.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'primary.main',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                {game.url}
              </Typography>
            </Box>
          </Collapse>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default GameCard;