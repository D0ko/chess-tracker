import client from './client';

export const api = {
  // Health check
  health: () => client.get('/health'),

  // Players endpoints
  players: {
    getInfo: (username) => client.get(`/api/v1/players/${username}`),
    getRanking: (username) => client.get(`/api/v1/players/${username}/ranking`),
    getGames: (username) => client.get(`/api/v1/players/${username}/games`),
  },

  // Stats endpoints
  stats: {
    getStats: (username) => client.get(`/api/v1/stats/${username}`),
    getSummary: (username) => client.get(`/api/v1/stats/${username}/summary`),
  },
};