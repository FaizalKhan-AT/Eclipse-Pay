const { verify } = require("jsonwebtoken");
const UserModel = require("../models/user.model");
class ProtectedRoute {
  constructor() {
    this.repo = new UserModel();
  }
  protect = async (req, res, next) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
        let decode = verify(token, process.env.JWT_SECRET);
        req.user = await this.repo.findUserSelect(decode.email);
        next();
      } catch (err) {
        return res
          .status(401)
          .json({ status: "error", error: "Not Authorized / invalid token" });
      }
    }
    if (!token)
      return res
        .status(401)
        .json({ status: "error", error: "No token present" });
  };
}
module.exports = ProtectedRoute;
