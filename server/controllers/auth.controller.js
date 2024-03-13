const UserModel = require("../models/user.model");

class AuthController {
  constructor() {
    this.userRepo = new UserModel();
  }
  async registerUser(data = { Email, Password }) {
    if (data) {
    }
    return {
      error: true,
      message: "No email and password",
      statusCode: 400,
    };
  }
}

module.exports = AuthController;
