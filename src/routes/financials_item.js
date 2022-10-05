module.exports = (app) => {
  const save = (req, res, next) => {
    app.services.financial_item
      .save(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const get = (req, res, next) => {
    app.services.financial_item
      .get()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const findById = (req, res, next) => {
    app.services.financial_item
      .findById(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const remove = (req, res, next) => {
    app.services.financial_item
      .remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  };

  const update = (req, res, next) => {
    app.services.financial_item
      .update(req.params.id, req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  return { save, get, findById, remove, update };
};
