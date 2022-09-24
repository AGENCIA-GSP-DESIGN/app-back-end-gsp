module.exports = (app) => {
  const save = (budget) => {
    return app.db('budgets').insert(budget);
  };

  const get = () => {
    return app.db('budgets');
  };

  const findById = (id) => {
    return app.db('budgets').where({ id }).first();
  };

  const remove = (id) => {
    return app.db('budgets').where({ id }).del();
  };

  const update = (id, budget) => {
    return app.db('budgets').where({ id }).update(budget);
  };

  return { save, get, findById, remove, update };
};
