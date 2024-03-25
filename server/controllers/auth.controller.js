const UserModel = require("../models/user.model");
const { hash, compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");
class AuthController {
  constructor() {
    this.repo = new UserModel();
    this.salt = parseInt(process.env.PASSWORD_SALT);
  }
  registerUser = async (data) => {
    const { email, password } = data;
    let pas = await hash(password, this.salt);
    let res = await this.repo.createUser(email, pas);

    return res;
  };

  loginUser = async (data) => {
    const { email, password } = data;
    let user = await this.repo.findUser(email);

    if (!user)
      return { error: true, message: "User not found", statusCode: 404 };

    if (await compare(password, user.password)) {
      const token = this.generateToken(user);
      return {
        token,
        email: user.email,
        id: user.id,
      };
    } else
      return {
        error: true,
        message: "Invalid login credentials",
        statusCode: 401,
      };
  };

  checkEmail = async (email) => {
    let user = await this.repo.findUser(email);

    if (!user)
      return { error: true, message: "User not found", statusCode: 404 };

    return "Email address is valid";
  };

  changePassword = async (email, password) => {
    let newPassword = hash(password, this.salt);
    let user = await this.repo.updateUser(email, newPassword);
    if (!user)
      return {
        error: true,
        message: "Password change was unsuccessfull",
        statusCode: 404,
      };

    return "Password changed successfully";
  };

  generateToken = (user) => {
    return sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d",
      }
    );
  };
}

module.exports = AuthController;
