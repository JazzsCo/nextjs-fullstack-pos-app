/*
  Warnings:

  - You are about to drop the column `cat_name` on the `addon_cats` table. All the data in the column will be lost.
  - You are about to drop the column `cat_name` on the `menu_cats` table. All the data in the column will be lost.
  - Added the required column `addon_cat_name` to the `addon_cats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menu_cat_name` to the `menu_cats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addon_cats" DROP COLUMN "cat_name",
ADD COLUMN     "addon_cat_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "locations" ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "menu_cats" DROP COLUMN "cat_name",
ADD COLUMN     "menu_cat_name" TEXT NOT NULL;
