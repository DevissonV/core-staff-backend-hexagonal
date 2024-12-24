import { envs } from './src/core/config/envs.js';

export default {
  development: {
    client: 'pg',
    connection: {
      host: envs.DB_HOST,
      user: envs.DB_USER,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
      port: envs.DB_PORT,
    },
    migrations: {
      directory: './src/core/database/migrations',
    },
    seeds: {
      directory: './src/core/database/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: envs.DB_HOST,
      user: envs.DB_USER,
      password: envs.DB_PASSWORD,
      database: envs.DB_NAME,
      port: envs.DB_PORT,
    },
    migrations: {
      directory: './src/core/database/migrations',
    },
    seeds: {
      directory: './src/core/database/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};