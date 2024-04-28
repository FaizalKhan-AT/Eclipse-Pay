const { PrismaClient } = require("@prisma/client");

class TransactionModel {
  constructor() {
    this.prisma = new PrismaClient();
  }
  getCardDetails = async (cardNumber) => {
    let card = await this.prisma.cardDetails.findUnique({
      where: {
        cardNumber,
      },
      select: {
        cardNumber: true,
        cardHolderName: true,
        expirationDate: true,
        cvv: true,
        accountNumber: true,
      },
    });
    if (card) return card;
  };
  debitMoney = async (accountNumber, amount, appName) => {
    try {
      let account = await this.prisma.bankAccount.findUnique({
        where: {
          accountNumber,
        },
        select: {
          balance: true,
        },
      });
      if (!account)
        return {
          error: true,
          message: "Bank account not found.",
          statusCode: 404,
        };

      if (account.balance < amount)
        return {
          error: true,
          message: "Insufficient balance for transaction",
          statusCode: 400,
        };
      const newBalance = account.balance - amount;

      let trans = await this.prisma.bankAccount.update({
        where: {
          accountNumber,
        },
        data: {
          balance: newBalance,
        },
      });

      if (trans) {
        let log = await this.prisma.transaction.create({
          data: {
            transAmount: amount,
            isSuccessful: true,
            accountNumber,
            appName,
            log: "Transaction successfull",
          },
        });
        if (log) return "Transaction successfull";
      }
    } catch (err) {
      let log = await this.prisma.transaction.create({
        data: {
          transAmount: amount,
          isSuccessful: false,
          accountNumber,
          appName,
          log: "Transaction unsuccessfull" + err,
        },
      });
      if (log) return "Transaction unsuccessfull";
    }
  };
  getTransactions = async (names) => {
    names = names.map((name) => name.appName);
    let trans = await this.prisma.transaction.findMany({
      where: {
        appName: {
          in: names,
        },
      },
      orderBy: {
        transDate: "desc",
      },
    });
    if (trans) return trans;
  };
}

module.exports = TransactionModel;
