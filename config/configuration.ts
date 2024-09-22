export default () => ({
  port: parseInt(process.env.PORT, 10),
  host: process.env.HOST,
  node_env: process.env.NODE_ENV,
  log_level: process.env.LOG_LEVEL,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
  },
});
