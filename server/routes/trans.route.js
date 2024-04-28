const Router = require("express").Router();
const asyncWrapper = require("../middlewares/AsyncWrapper");
const { createCustomError } = require("../Error/CustomError");
const TransactionController = require("../controllers/trans.controller");

class TransactionRouter {
  constructor(TransactionController) {
    this._controllerService = TransactionController;
  }
  initiatePayment = asyncWrapper(async (req, res, next) => {
    const response = await this._controllerService.initiatePayment(
      req.headers.appsecret,
      req.body
    );
    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({ status: "ok", data: response });
  });

  getAllTransactions = asyncWrapper(async (req, res, next) => {
    const response = await this._controllerService.getAllTransactions(
      +req.headers.id
    );
    if (response.error)
      return next(createCustomError(response.message, response.statusCode));

    return res.status(200).json({ status: "ok", data: response });
  });
}
const _TransactionRouterService = new TransactionRouter(
  new TransactionController()
);

Router.route("/")
  .post(_TransactionRouterService.initiatePayment)
  .get(_TransactionRouterService.getAllTransactions);

module.exports = Router;
