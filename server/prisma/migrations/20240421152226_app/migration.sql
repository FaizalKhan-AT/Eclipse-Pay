/*
  Warnings:

  - The primary key for the `app` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[appId]` on the table `App` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `appId` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `app` DROP PRIMARY KEY,
    ADD COLUMN `appId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`, `appId`);

-- CreateIndex
CREATE UNIQUE INDEX `App_appId_key` ON `App`(`appId`);
