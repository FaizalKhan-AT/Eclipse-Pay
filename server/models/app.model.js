const { PrismaClient } = require("@prisma/client");

class AppsModel {
  constructor() {
    this.prisma = new PrismaClient();
  }

  createApp = async (data) => {
    try {
      const appSecret = data.apiKey;
      delete data.apiKey;
      let app = await this.prisma.app.create({
        data,
      });
      if (app)
        return {
          message: "Application created successfully",
          appSecret,
        };
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
      select: {
        id: true,
        appName: true,
        allowedOrigins: true,
        description: true,
        isProd: true,
        accountNumber: true,
      },
    });
    if (app) return app;
  };

  updateApp = async (appName, data) => {
    let app = await this.prisma.app.update({
      where: {
        appName,
      },
      data: {
        ...data,
      },
    });
    if (app) return "Application updated successfully";
  };

  findApps = async (userId) => {
    let apps = await this.prisma.app.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        appName: true,
        allowedOrigins: true,
        description: true,
        isProd: true,
        accountNumber: true,
      },
    });
    if (apps) return apps;
  };

  getPassword = async (appName) => {
    let app = await this.prisma.app.findUnique({
      where: {
        appName,
      },
      select: {
        password: true,
      },
    });
    if (app) return app;
  };

  deleteApp = async (appName) => {
    let app = await this.prisma.app.delete({
      where: {
        appName,
      },
    });
    if (app) return app;
  };
}

module.exports = AppsModel;
