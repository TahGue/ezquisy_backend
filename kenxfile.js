const knex = require('knex')({
    client: 'sqlite3',
    connection: {
      filename: "./src/db/mydb.sqlite"
    },
    migrations: {
        tableName: "knexmig"
      }
  });

 