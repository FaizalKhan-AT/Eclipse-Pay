const asyncWrapper = require("../middlewares/AsyncWrapper");

class AuthController {
  registerUser = asyncWrapper((req, res, next) => {
    res.send("hello world");
  });
}

module.exports = AuthController;
