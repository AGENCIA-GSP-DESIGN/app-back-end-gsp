module.exports = (app) => {
  app.route('/client').get(app.routes.client.get).post(app.routes.client.save);
  app
    .route('/client/:id')
    .get(app.routes.client.findById)
    .put(app.routes.client.update)
    .delete(app.routes.client.remove);
};
