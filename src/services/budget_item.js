module.exports = (app) => {
  const save = (budgetItem) => {
    return app.db('budgets_items').insert(budgetItem);
  };

  return { save };
};
