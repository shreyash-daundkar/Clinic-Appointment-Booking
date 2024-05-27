/*
  Warnings:

  - You are about to drop the column `department` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `doctors` DROP COLUMN `department`,
    MODIFY `contact` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `contact` VARCHAR(191) NOT NULL;
