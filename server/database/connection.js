const { PrismaClient } = require("@prisma/client");

class PrismaConnection {
  prisma;
  prismaInit() {
    if (!this.prisma) {
      this.prisma = new PrismaClient();
      return this.prisma;
    }
  }
  disconnectPrisma() {
    if (this.prisma) {
      this.prisma.$disconnect();
    }
  }
}

module.exports = PrismaConnection;
