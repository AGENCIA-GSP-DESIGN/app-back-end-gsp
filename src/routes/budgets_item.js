module.exports = (app) => {
  const save = (req, res, next) => {
    app.services.budget_item
      .save(req.body)
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
  };

  return { save };
};
