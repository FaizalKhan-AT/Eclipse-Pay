const { PrismaClient } = require("@prisma/client");

class AppsModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  createApp = async (data) => {
    try {
      let app = await this.prisma.app.create({
        data,
      });
      if (app) return "Application created successfully";
    } catch (err) {
      return {
        error: true,
        message: "Something went wrong",
        statusCode: 500,
      };
    }
  };

  findApp = async (appName) => {
    let app = await this.prisma.app.findUnique({
      where: {
        appName,
      },
    });
    if (app) return app;
  };
}

module.exports = AppsModel;
