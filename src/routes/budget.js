module.exports = (app) => {
  const save = (req, res) => {
    app.services.budget
      .save(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const get = (req, res) => {
    app.services.budget
      .get()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const findById = (req, res) => {
    app.services.budget
      .findById(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const remove = (req, res) => {
    app.services.budget
      .remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  };

  const update = (req, res) => {
    app.services.budget
      .update(req.params.id, req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  return { save, get, findById, remove, update };
};
