/*
  Warnings:

  - The primary key for the `app` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appId` on the `app` table. All the data in the column will be lost.
  - You are about to drop the column `clientSecret` on the `app` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `app` DROP PRIMARY KEY,
    DROP COLUMN `appId`,
    DROP COLUMN `clientSecret`,
    ADD PRIMARY KEY (`id`);
