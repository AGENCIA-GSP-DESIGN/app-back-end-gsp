module.exports = (app) => {
  const save = (budgetItem) => {
    return app.db('budgets_items').insert(budgetItem);
  };

  const get = () => {
    return app.db('budgets_items');
  };

  const findById = (id) => {
    return app.db('budgets_items').where({ id }).first();
  };

  const remove = (id) => {
    return app.db('budgets_items').where({ id }).del();
  };

  const update = (id, budgetItem) => {
    return app.db('budgets_items').where({ id }).update(budgetItem);
  };

  return { save, get, findById, remove, update };
};
