module.exports = {
  async rewrites() {
    return [
      { source: '/feed/:feedID', destination: '/api/feed' },
      {
        source: '/feed/:feedID/:privateID/:privateKey/:episodeID.mp3',
        destination: '/api/episode',
      },
    ];
  },
};
