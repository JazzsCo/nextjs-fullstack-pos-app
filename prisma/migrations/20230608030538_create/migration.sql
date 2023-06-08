/*
  Warnings:

  - You are about to drop the column `addon_cat_id` on the `menus_menu_cats_addon_cats_locations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "menus_menu_cats_addon_cats_locations" DROP CONSTRAINT "menus_menu_cats_addon_cats_locations_addon_cat_id_fkey";

-- AlterTable
ALTER TABLE "menus_menu_cats_addon_cats_locations" DROP COLUMN "addon_cat_id",
ALTER COLUMN "location_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "menus_addon_cats" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "addon_cat_id" INTEGER NOT NULL,

    CONSTRAINT "menus_addon_cats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menus_addon_cats" ADD CONSTRAINT "menus_addon_cats_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_addon_cats" ADD CONSTRAINT "menus_addon_cats_addon_cat_id_fkey" FOREIGN KEY ("addon_cat_id") REFERENCES "addon_cats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
