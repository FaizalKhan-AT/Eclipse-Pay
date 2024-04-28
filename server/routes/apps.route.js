const Router = require("express").Router();
const asyncWrapper = require("../middlewares/AsyncWrapper");
const { createCustomError } = require("../Error/CustomError");
const AppsController = require("../controllers/apps.controller");

class AppsRouter {
  constructor(AppsController) {
    this._controllerService = AppsController;
  }
  createApp = asyncWrapper(async (req, res, next) => {
    const response = await this._controllerService.createApp(req.body);

    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({ status: "ok", data: response });
  });

  getAllApps = asyncWrapper(async (req, res, next) => {
    const response = await this._controllerService.getAllApps(+req.headers.id);

    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({ status: "ok", data: response });
  });

  getSingleApp = asyncWrapper(async (req, res, next) => {
    const response = await this._controllerService.getSingleApp(
      req.params.appname.toLocaleUpperCase()
    );
    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({ status: "ok", data: response });
  });

  updateSingleApp = asyncWrapper(async (req, res, next) => {
    const response = await this._controllerService.updateSingleApp(
      req.params.appname.toLocaleUpperCase(),
      req.body
    );
    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({ status: "ok", data: response });
  });

  verifyAppPassword = asyncWrapper(async (req, res, next) => {
    const response = await this._controllerService.verifyAppPassword(
      req.params.appname.toLocaleUpperCase(),
      req.body.password
    );
    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({ status: "ok", data: response });
  });

  deleteSingleApp = asyncWrapper(async (req, res, next) => {
    const response = await this._controllerService.deleteSingleApp(
      req.params.appname.toLocaleUpperCase()
    );
    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({ status: "ok", data: response });
  });
}

const _AppsRouter = new AppsRouter(new AppsController());

Router.route("/").post(_AppsRouter.createApp).get(_AppsRouter.getAllApps);
Router.route("/:appname")
  .get(_AppsRouter.getSingleApp)
  .patch(_AppsRouter.updateSingleApp)
  .post(_AppsRouter.verifyAppPassword)
  .delete(_AppsRouter.deleteSingleApp);

module.exports = Router;
