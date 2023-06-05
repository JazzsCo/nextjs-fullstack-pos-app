/*
  Warnings:

  - You are about to drop the `menu_cats_addon_cats_locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menus_addon_cats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menus_locations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `menus_menu_cats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "menu_cats_addon_cats_locations" DROP CONSTRAINT "menu_cats_addon_cats_locations_addon_cat_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_cats_addon_cats_locations" DROP CONSTRAINT "menu_cats_addon_cats_locations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "menu_cats_addon_cats_locations" DROP CONSTRAINT "menu_cats_addon_cats_locations_menu_cat_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_addon_cats" DROP CONSTRAINT "menus_addon_cats_addon_cat_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_addon_cats" DROP CONSTRAINT "menus_addon_cats_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_locations" DROP CONSTRAINT "menus_locations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_locations" DROP CONSTRAINT "menus_locations_menu_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_cats" DROP CONSTRAINT "menus_menu_cats_menu_cat_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_cats" DROP CONSTRAINT "menus_menu_cats_menu_id_fkey";

-- DropTable
DROP TABLE "menu_cats_addon_cats_locations";

-- DropTable
DROP TABLE "menus_addon_cats";

-- DropTable
DROP TABLE "menus_locations";

-- DropTable
DROP TABLE "menus_menu_cats";

-- CreateTable
CREATE TABLE "menus_menu_cats_addon_cats_locations" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER,
    "location_id" INTEGER NOT NULL,
    "menu_cat_id" INTEGER,
    "addon_cat_id" INTEGER,
    "is_available" BOOLEAN DEFAULT true,

    CONSTRAINT "menus_menu_cats_addon_cats_locations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menus_menu_cats_addon_cats_locations" ADD CONSTRAINT "menus_menu_cats_addon_cats_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_cats_addon_cats_locations" ADD CONSTRAINT "menus_menu_cats_addon_cats_locations_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_cats_addon_cats_locations" ADD CONSTRAINT "menus_menu_cats_addon_cats_locations_menu_cat_id_fkey" FOREIGN KEY ("menu_cat_id") REFERENCES "menu_cats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_cats_addon_cats_locations" ADD CONSTRAINT "menus_menu_cats_addon_cats_locations_addon_cat_id_fkey" FOREIGN KEY ("addon_cat_id") REFERENCES "addon_cats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
