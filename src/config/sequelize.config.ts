/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv/config');

const { env } = process;

module.exports = {
  development: {
    username: env.DEV_DB_USERNAME,
    password: env.DEV_DB_PASSWORD,
    database: env.DEV_DB_NAME,
    host: env.DEV_DB_HOSTNAME,
    port: env.DEV_DB_PORT,
    dialect: env.DEV_DB_DIALECT,
  },
  production: {
    username: env.PROD_DB_USERNAME,
    password: env.PROD_DB_PASSWORD,
    database: env.PROD_DB_NAME,
    host: env.PROD_DB_HOSTNAME,
    port: env.PROD_DB_PORT,
    dialect: env.PROD_DB_DIALECT,
  },
};
