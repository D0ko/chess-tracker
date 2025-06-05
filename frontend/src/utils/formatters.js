import { format, formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  return format(new Date(timestamp * 1000), 'dd MMM yyyy', { locale: fr });
};

export const formatRelativeTime = (timestamp) => {
  if (!timestamp) return '';
  return formatDistanceToNow(new Date(timestamp * 1000), { 
    addSuffix: true, 
    locale: fr 
  });
};

export const formatRating = (rating) => {
  if (!rating) return 'N/A';
  return rating.toLocaleString();
};

export const formatWinRate = (wins, losses, draws) => {
  const total = wins + losses + draws;
  if (total === 0) return '0%';
  return `${Math.round((wins / total) * 100)}%`;
};

export const getTimeControlLabel = (timeControl) => {
  if (!timeControl) return 'Unknown';
  
  // Format: "600" = 10 minutes, "180+2" = 3 minutes + 2 seconds increment
  if (timeControl.includes('+')) {
    const [time, increment] = timeControl.split('+');
    const minutes = Math.floor(parseInt(time) / 60);
    return `${minutes}+${increment}`;
  }
  
  const seconds = parseInt(timeControl);
  if (seconds >= 3600) return 'Daily';
  if (seconds >= 600) return 'Rapid';
  if (seconds >= 180) return 'Blitz';
  return 'Bullet';
};