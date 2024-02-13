-- CreateTable
CREATE TABLE `DM` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `DM` MEDIUMTEXT NOT NULL,
    `sellerId` INTEGER NOT NULL,
    `buyerId` INTEGER NOT NULL,
    `score` INTEGER NOT NULL DEFAULT 1,

    INDEX `DM_sellerId_idx`(`sellerId`),
    INDEX `DM_buyerId_idx`(`buyerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
