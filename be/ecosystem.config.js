module.exports = {
  apps: [
    {
      name: "sonmc-api-5000",
      script: "./dist/main.js",
      watch: true,
      restart_delay: 50000,
    },
  ],
};
