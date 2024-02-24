const Router = require("express").Router();
const AuthController = require("../controllers/auth.controller");

const controllerService = new AuthController();

Router.route("/register").post(controllerService.registerUser);

module.exports = Router;
