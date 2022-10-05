const app = require('express')();
const consign = require('consign');
const knex = require('knex');
const knexfile = require('../knexfile');

// TODO colocar de forma dinamica
app.db = knex(knexfile.test);

consign({ cwd: 'src', verbose: false })
  .then('./config/middlewares.js')
  .then('./services')
  .then('./routes')
  .then('./config/router.js')
  .into(app);

app.get('/', (req, res) => {
  res.status(200).send();
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: 'Erro Interno! :(' });
});

module.exports = app;
