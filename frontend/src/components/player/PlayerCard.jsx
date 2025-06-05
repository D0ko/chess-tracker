import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  LocationOn as LocationIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { formatDate, formatRelativeTime } from '../../utils/formatters';
import { motion } from 'framer-motion';

const PlayerCard = ({ player }) => {
  if (!player) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={player.avatar}
              sx={{
                width: 80,
                height: 80,
                mr: 2,
                bgcolor: 'primary.main',
              }}
            >
              {player.username[0].toUpperCase()}
            </Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h4">
                  {player.username}
                </Typography>
                {player.title && (
                  <Chip
                    label={player.title}
                    color="primary"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  />
                )}
              </Box>
              {player.name && (
                <Typography variant="body1" color="text.secondary">
                  {player.name}
                </Typography>
              )}
              <Chip
                label={player.status}
                size="small"
                color={player.status === 'premium' ? 'success' : 'default'}
                sx={{ mt: 1 }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {player.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationIcon fontSize="small" color="action" />
                <Typography variant="body2">{player.location}</Typography>
              </Box>
            )}
            
            {player.country && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LanguageIcon fontSize="small" color="action" />
                <Typography variant="body2">
                  {player.country.toUpperCase()}
                </Typography>
              </Box>
            )}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon fontSize="small" color="action" />
              <Typography variant="body2">
                Inscrit le {formatDate(player.joined)}
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary">
              Dernière connexion {formatRelativeTime(player.last_online)}
            </Typography>

            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Abonnés
                </Typography>
                <Typography variant="h6">
                  {player.followers?.toLocaleString() || 0}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PlayerCard;