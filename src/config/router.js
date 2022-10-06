const { storage } = require('../middlewares/uploadImage');
const multer = require('multer');

const upload = multer({ storage: storage });

module.exports = (app) => {
  app.route('/client').get(app.routes.client.get).post(app.routes.client.save);
  app
    .route('/client/:id')
    .get(app.routes.client.findById)
    .put(app.routes.client.update)
    .delete(app.routes.client.remove);

  app.route('/budget').get(app.routes.budget.get).post(app.routes.budget.save);

  app
    .route('/budget/:id')
    .get(app.routes.budget.findById)
    .put(app.routes.budget.update)
    .delete(app.routes.budget.remove);

  app
    .route('/budget_item')
    .get(app.routes.budgets_item.get)
    .post(app.routes.budgets_item.save);

  app
    .route('/budget_item/:id')
    .get(app.routes.budgets_item.findById)
    .put(app.routes.budgets_item.update)
    .delete(app.routes.budgets_item.remove);

  app
    .route('/financial')
    .get(app.routes.financials.get)
    .post(app.routes.financials.save);

  app
    .route('/financial/:id')
    .get(app.routes.financials.findById)
    .put(app.routes.financials.update)
    .delete(app.routes.financials.remove);

  app
    .route('/financial_items')
    .get(app.routes.financials_item.get)
    .post(app.routes.financials_item.save);

  app
    .route('/financial_items/:id')
    .get(app.routes.financials_item.findById)
    .put(app.routes.financials_item.update)
    .delete(app.routes.financials_item.remove);

  app.post(
    '/upload-image',
    upload.single('image'),
    app.routes.upload_image.upload
  );
};
