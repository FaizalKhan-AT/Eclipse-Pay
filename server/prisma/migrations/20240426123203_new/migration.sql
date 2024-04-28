/*
  Warnings:

  - Added the required column `clientSecret` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `app` ADD COLUMN `clientSecret` VARCHAR(191) NOT NULL;
