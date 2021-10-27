module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/db/db.sqlite',
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
    },
    migrations: {
      directory: './src/db/migrations',
    },
    seeds: {
      directory: './src/db/seeds',
    },
  },
};
