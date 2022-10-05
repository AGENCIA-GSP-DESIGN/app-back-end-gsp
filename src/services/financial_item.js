module.exports = (app) => {
  const save = (financial) => {
    return app.db('financials_items').insert(financial);
  };

  const get = () => {
    return app.db('financials_items');
  };

  const findById = (id) => {
    return app.db('financials_items').where({ id }).first();
  };

  const remove = (id) => {
    return app.db('financials_items').where({ id }).del();
  };

  const update = (id, financial) => {
    return app.db('financials_items').where({ id }).update(financial);
  };

  return { save, get, findById, remove, update };
};
