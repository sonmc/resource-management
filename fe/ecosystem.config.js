module.exports = {
  script: "serve",
  name: "sonmc-fe-5001",
  env: {
    PM2_SERVE_PATH: "build",
    PM2_SERVE_PORT: 5001,
    PM2_SERVE_SPA: "true",
    PM2_SERVE_HOMEPAGE: "/index.html",
  },
};
