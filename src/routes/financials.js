module.exports = (app) => {
  const save = (req, res, next) => {
    app.services.financial
      .save(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const get = (req, res, next) => {
    app.services.financial
      .get()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const findById = (req, res, next) => {
    app.services.financial
      .findById(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const remove = (req, res, next) => {
    app.services.financial
      .remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  };

  const update = (req, res, next) => {
    app.services.financial
      .update(req.params.id, req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  return { save, get, findById, remove, update };
};
