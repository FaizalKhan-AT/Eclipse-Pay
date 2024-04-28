const { compare } = require("bcrypt");
const AppsModel = require("../models/app.model");
const TransactionModel = require("../models/trans.model");

class TransactionController {
  constructor() {
    this.repo = new TransactionModel();
    this.appRepo = new AppsModel();
  }

  initiatePayment = async (appSecret, data) => {
    const appname = appSecret.split("~")[0];
    let app = await this.appRepo.getAppSecret(appname);
    if (!app)
      return {
        error: true,
        message: "Application for transaction not Found",
        statusCode: 404,
      };

    if (await compare(appSecret, app.appSecret)) {
      let card = await this.validateCardDetails(data.card);
      if (!card.isValid)
        return {
          error: true,
          message: "Invalid card details.",
          statusCode: 401,
        };
      let debited = await this.repo.debitMoney(
        card.accountNumber,
        data.amount,
        appname
      );
      if (debited) return debited;
    } else
      return {
        error: true,
        message: "Invalid app secret provided.",
        statusCode: 401,
      };
  };

  getAllTransactions = async (userId) => {
    let appnames = await this.appRepo.getAppNames(userId);
    if (appnames) {
      let trans = await this.repo.getTransactions(appnames);
      if (trans) return trans;
    }
  };

  async validateCardDetails(data) {
    let card = await this.repo.getCardDetails(data.cardNumber);
    if (card) {
      const accountNumber = card.accountNumber;
      delete card.accountNumber;
      if (JSON.stringify(card) === JSON.stringify(data))
        return {
          isValid: true,
          accountNumber,
        };
    }
    return { isValid: false };
  }
}

module.exports = TransactionController;
