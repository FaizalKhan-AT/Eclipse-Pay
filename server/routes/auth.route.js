const Router = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const asyncWrapper = require("../middlewares/AsyncWrapper");
const { createCustomError } = require("../Error/CustomError");
const ProtectedRoute = require("../middlewares/protectedRoute");

class AuthRouter {
  constructor(AuthController) {
    this._controllerService = AuthController;
  }

  getUser = asyncWrapper(async (req, res, next) => {
    if (!req.user)
      return next(createCustomError("User not found or doesn't exist", 404));

    return res.status(200).json({ status: "ok", data: req.user });
  });

  registerUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const response = await this._controllerService.registerUser({
      email,
      password,
    });
    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({ status: "ok", data: response });
  });

  loginUser = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const response = await this._controllerService.loginUser({
      email,
      password,
    });
    if (response.error)
      return next(createCustomError(response.message, response.statusCode));
    return res.status(200).json({ status: "ok", data: response });
  });

  checkEmail = asyncWrapper(async (req, res, next) => {
    const email = req.get("email");
    const response = await this._controllerService.checkEmail(email);
    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({
      status: "ok",
      data: response,
    });
  });

  changePassword = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body;
    const response = await this._controllerService.changePassword(
      email,
      password
    );
    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({
      status: "ok",
      data: response,
    });
  });
}

const _AuthRouterService = new AuthRouter(new AuthController());
const _ProtectedRoute = new ProtectedRoute();

Router.route("/").get(_ProtectedRoute.protect, _AuthRouterService.getUser);
Router.route("/register").post(_AuthRouterService.registerUser);
Router.route("/login").post(_AuthRouterService.loginUser);
Router.route("/forgot-password/check-email").get(_AuthRouterService.checkEmail);
Router.route("/forgot-password/change-password").post(
  _AuthRouterService.changePassword
);

module.exports = Router;
