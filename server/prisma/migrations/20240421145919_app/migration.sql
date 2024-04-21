/*
  Warnings:

  - The primary key for the `app` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appId` on the `app` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `App_appId_key` ON `app`;

-- AlterTable
ALTER TABLE `app` DROP PRIMARY KEY,
    DROP COLUMN `appId`,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transDate` DATETIME(3) NOT NULL,
    `transAmount` DOUBLE NOT NULL,
    `isSuccessful` BOOLEAN NOT NULL,
    `log` VARCHAR(191) NOT NULL DEFAULT '',
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
