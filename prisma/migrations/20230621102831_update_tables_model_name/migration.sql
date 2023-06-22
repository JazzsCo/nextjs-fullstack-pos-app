/*
  Warnings:

  - You are about to drop the column `asset_url` on the `tables` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tables" DROP COLUMN "asset_url",
ADD COLUMN     "table_url" TEXT;
