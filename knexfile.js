module.exports = {
  test: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'gsp_db',
    },
  },
  migrations: {
    directory: 'src/migrations',
  },
};
