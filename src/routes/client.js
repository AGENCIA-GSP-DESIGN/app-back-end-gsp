const ClientFormError = require('../errors/ClientFormError');

module.exports = (app) => {
  const validate = async (client, save = true) => {
    const error = ClientFormError(client);

    if (save) {
      await app
        .db('client')
        .where('email', client.email)
        .then((result) => {
          if (result.length && result[0]?.email) {
            error.push('Não pode inserir um Cliente com o mesmo E-mail!');
          }
        })
        .catch((err) => {});
    }

    return error;
  };

  const get = (req, res, next) => {
    app.services.client
      .get()
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const save = async (req, res, next) => {
    const errors = await validate(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    app.services.client
      .save(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const findById = (req, res, next) => {
    app.services.client
      .findById(req.params.id)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  const remove = (req, res, next) => {
    app.services.client
      .remove(req.params.id)
      .then(() => res.status(204).send())
      .catch((err) => next(err));
  };

  const update = (req, res, next) => {
    const errors = validate(req.body, false);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    app.services.client
      .update(req.params.id, req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => next(err));
  };

  return {
    get,
    save,
    findById,
    remove,
    update,
  };
};
