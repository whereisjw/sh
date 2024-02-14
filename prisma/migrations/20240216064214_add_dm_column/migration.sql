/*
  Warnings:

  - Added the required column `userId` to the `DM` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dm` ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `DM_userId_idx` ON `DM`(`userId`);
