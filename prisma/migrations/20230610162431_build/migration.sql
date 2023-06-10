/*
  Warnings:

  - You are about to drop the `menus_menu_cats_locations` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "menus_menu_cats_locations" DROP CONSTRAINT "menus_menu_cats_locations_location_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_cats_locations" DROP CONSTRAINT "menus_menu_cats_locations_menu_cat_id_fkey";

-- DropForeignKey
ALTER TABLE "menus_menu_cats_locations" DROP CONSTRAINT "menus_menu_cats_locations_menu_id_fkey";

-- DropTable
DROP TABLE "menus_menu_cats_locations";

-- CreateTable
CREATE TABLE "menus_locations" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "location_id" INTEGER,
    "is_available" BOOLEAN DEFAULT true,

    CONSTRAINT "menus_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_menu_cats" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "menu_cat_id" INTEGER NOT NULL,

    CONSTRAINT "menus_menu_cats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "menus_locations" ADD CONSTRAINT "menus_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_locations" ADD CONSTRAINT "menus_locations_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_cats" ADD CONSTRAINT "menus_menu_cats_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_cats" ADD CONSTRAINT "menus_menu_cats_menu_cat_id_fkey" FOREIGN KEY ("menu_cat_id") REFERENCES "menu_cats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
