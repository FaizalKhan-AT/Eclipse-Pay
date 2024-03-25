const PrismaConnection = require("./connection");

module.exports = {
  prisma: new PrismaConnection(),
};
