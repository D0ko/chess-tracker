import { useQuery } from '@tanstack/react-query';
import { api } from '../api/endpoints';

export const usePlayerStats = (username, options = {}) => {
  return useQuery({
    queryKey: ['player-stats', username],
    queryFn: async () => {
      const response = await api.stats.getStats(username);
      return response.data.data;
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const usePlayerSummary = (username, options = {}) => {
  return useQuery({
    queryKey: ['player-summary', username],
    queryFn: async () => {
      const response = await api.stats.getSummary(username);
      return response.data.data;
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};