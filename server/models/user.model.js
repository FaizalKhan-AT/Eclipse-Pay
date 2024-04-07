const { PrismaClient } = require("@prisma/client");

class UserModel {
  constructor() {
    this.prisma = new PrismaClient();
  }
  createUser = async (email, password) => {
    try {
      let user = await this.prisma.user.create({
        data: {
          email,
          password,
        },
      });
      if (user) return "User registeration was successfull";
    } catch (err) {
      if (err.code === "P2002")
        return {
          error: true,
          message: "Email address already exists",
          statusCode: 409,
        };
    }
  };

  findUser = async (email) => {
    let user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) return user;
  };

  updateUser = async (email, password) => {
    let user = await this.prisma.user.update({
      where: {
        email,
      },
      data: {
        password,
      },
    });
    if (user) return user;
  };
}

module.exports = UserModel;
