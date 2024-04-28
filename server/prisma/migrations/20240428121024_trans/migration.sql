/*
  Warnings:

  - Added the required column `appName` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `appName` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_appName_fkey` FOREIGN KEY (`appName`) REFERENCES `App`(`appName`) ON DELETE RESTRICT ON UPDATE CASCADE;
