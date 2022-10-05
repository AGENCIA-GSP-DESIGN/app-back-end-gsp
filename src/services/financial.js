module.exports = (app) => {
  const save = (financial) => {
    return app.db('financials').insert(financial);
  };

  const get = () => {
    return app.db('financials');
  };

  const findById = (id) => {
    return app.db('financials').where({ id }).first();
  };

  const remove = (id) => {
    return app.db('financials').where({ id }).del();
  };

  const update = (id, financial) => {
    return app.db('financials').where({ id }).update(financial);
  };

  return { save, get, findById, remove, update };
};
