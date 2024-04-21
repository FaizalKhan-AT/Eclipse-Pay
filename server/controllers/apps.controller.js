const AppsModel = require("../models/app.model");
const { hash, compare } = require("bcrypt");

class AppsController {
  constructor() {
    this.repo = new AppsModel();
    this.salt = parseInt(process.env.PASSWORD_SALT);
  }

  createApp = async (data) => {
    let isAppPresent = await this.repo.findApp(data.appName);
    if (isAppPresent)
      return {
        error: true,
        message: "App with same name already exists",
        statusCode: 400,
      };

    let pas = await hash(password, this.salt);
    let appData = {
      ...data,
      password: pas,
    };
    let app = await this.repo.createApp(appData);
  };
}

module.exports = AppsController;
