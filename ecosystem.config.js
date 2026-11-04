module.exports = {
  apps: [
    {
      name: 'ma-zuzai-raid',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        WS_PORT: 8081
      }
    }
  ]
};
