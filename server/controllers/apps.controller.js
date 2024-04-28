const AppsModel = require("../models/app.model");
const { hash, compare } = require("bcrypt");
const {
  generateApiKey,
  generateAppSecret,
} = require("../utils/key-generation");

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

    const pas = await hash(data.password, this.salt);
    const apiKey = generateApiKey(data.appName);
    const appSecret = await generateAppSecret(apiKey);
    let appData = {
      ...data,
      password: pas,
      apiKey,
      appSecret,
    };
    let app = await this.repo.createApp(appData);
    return app;
  };

  getAllApps = async (id) => {
    let apps = await this.repo.findApps(id);
    return apps;
  };

  getSingleApp = async (appName) => {
    let app = await this.repo.findApp(appName);
    if (app) return app;
    return {
      error: true,
      message: "App not found.",
      statusCode: 404,
    };
  };

  updateSingleApp = async (appName, data) => {
    return await this.repo.updateApp(appName, data);
  };

  verifyAppPassword = async (appName, password) => {
    let app = await this.repo.getPassword(appName);
    if (await compare(password, app.password)) {
      return "Password verified";
    } else
      return {
        error: true,
        message: "Invalid password",
        statusCode: 401,
      };
  };

  deleteSingleApp = async (appName) => {
    let app = await this.repo.deleteApp(appName);
    if (app) return "Application deleted successfully.";
  };
}

module.exports = AppsController;
