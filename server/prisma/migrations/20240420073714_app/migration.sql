-- CreateTable
CREATE TABLE `App` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(191) NOT NULL,
    `appName` VARCHAR(191) NOT NULL,
    `appId` VARCHAR(191) NOT NULL,
    `allowedOrigins` VARCHAR(191) NOT NULL,
    `apiKey` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `App_appName_key`(`appName`),
    UNIQUE INDEX `App_appId_key`(`appId`),
    PRIMARY KEY (`id`, `appId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
