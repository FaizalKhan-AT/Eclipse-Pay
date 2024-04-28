/*
  Warnings:

  - You are about to drop the column `apiKey` on the `app` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `App_apiKey_key` ON `app`;

-- AlterTable
ALTER TABLE `app` DROP COLUMN `apiKey`;
