module.exports = (app) => {
  const get = () => {
    return app.db('client');
  };

  const save = (client) => {
    return app.db('client').insert(client);
  };

  const findById = (id) => {
    return app.db('client').where({ id });
  };

  const remove = (id) => {
    return app.db('client').where({ id }).del();
  };

  const update = (id, client) => {
    return app.db('client').where({ id }).update(client);
  };

  return {
    get,
    save,
    findById,
    remove,
    update,
  };
};
