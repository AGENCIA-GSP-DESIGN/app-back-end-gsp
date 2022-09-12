module.exports = (app) => {
  const get = (req, res) => {
    app.services.client
      .get()
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  };

  const save = (req, res) => {
    app.services.client
      .save(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  };

  const findById = (req, res) => {
    app.services.client
      .findById(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  };

  const remove = (req, res) => {
    app.services.client
      .remove(req.params.id)
      .then(() => res.status(201))
      .catch((err) => console.log(err));
  };

  const update = (req, res) => {
    app.services.client
      .update(req.params.id, req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  };

  return {
    get,
    save,
    findById,
    remove,
    update,
  };
};
