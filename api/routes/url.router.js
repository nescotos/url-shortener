const URLController = require('../controller/url.controller');

module.exports = (express) => {
  let urlRouter = express.Router();

  urlRouter.route('/url')
  .get(URLController.getAllUrls)
  .post(URLController.saveUrl);

  urlRouter.route('/url/:id')
  .get(URLController.getUrl);

  return urlRouter;

};
