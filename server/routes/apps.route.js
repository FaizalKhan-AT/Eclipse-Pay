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

    return res
      .status(200)
      .json({ status: "ok", data: "App created successfully" });
  });
}

const _AppsRouter = new AppsRouter(new AppsController());

Router.route("/").post(_AppsRouter.createApp);

module.exports = Router;
