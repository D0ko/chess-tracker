import { useQuery } from '@tanstack/react-query';
import { api } from '../api/endpoints';

export const usePlayer = (username, options = {}) => {
  return useQuery({
    queryKey: ['player', username],
    queryFn: async () => {
      const response = await api.players.getInfo(username);
      return response.data.data;
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

export const usePlayerRanking = (username, options = {}) => {
  return useQuery({
    queryKey: ['player-ranking', username],
    queryFn: async () => {
      const response = await api.players.getRanking(username);
      return response.data.data;
    },
    enabled: !!username,
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const usePlayerGames = (username, options = {}) => {
  return useQuery({
    queryKey: ['player-games', username],
    queryFn: async () => {
      const response = await api.players.getGames(username);
      return response.data.data;
    },
    enabled: !!username,
    staleTime: 2 * 60 * 1000, // 2 minutes
    ...options,
  });
};