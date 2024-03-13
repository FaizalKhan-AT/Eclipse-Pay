const Router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const { createCustomError } = require("../Error/CustomError");
class AuthRouter {
  constructor(AuthController) {
    this._controllerService = AuthController;
  }

  registerUser = asyncWrapper(async (req, res, next) => {
    const { Email, Password } = req.body;
    const response = await this._controllerService.registerUser({
      Email,
      Password,
    });
    if (response.error) {
      next(createCustomError(response.message, response.statusCode));
    }
  });
}

const _AuthRouterService = new AuthRouter(new AuthController());

Router.route("/register").post(_AuthRouterService.registerUser);

module.exports = Router;
