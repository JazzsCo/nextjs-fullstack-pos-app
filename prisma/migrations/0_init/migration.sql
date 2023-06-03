-- CreateTable
CREATE TABLE "addon_cats" (
    "id" SERIAL NOT NULL,
    "cat_name" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "addon_cats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addons" (
    "id" SERIAL NOT NULL,
    "addon_name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "addons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addons_addon_cats" (
    "id" SERIAL NOT NULL,
    "addon_id" INTEGER NOT NULL,
    "addon_cat_id" INTEGER NOT NULL,

    CONSTRAINT "addons_addon_cats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "location_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_cats" (
    "id" SERIAL NOT NULL,
    "cat_name" TEXT NOT NULL,

    CONSTRAINT "menu_cats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_cats_addon_cats_locations" (
    "id" SERIAL NOT NULL,
    "menu_cat_id" INTEGER,
    "addon_cat_id" INTEGER,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "menu_cats_addon_cats_locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_addon_cats" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "addon_cat_id" INTEGER NOT NULL,

    CONSTRAINT "menus_addon_cats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_locations" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "is_available" BOOLEAN NOT NULL DEFAULT true,

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
ALTER TABLE "addons_addon_cats" ADD CONSTRAINT "addons_addon_cats_addon_cat_id_fkey" FOREIGN KEY ("addon_cat_id") REFERENCES "addon_cats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "addons_addon_cats" ADD CONSTRAINT "addons_addon_cats_addon_id_fkey" FOREIGN KEY ("addon_id") REFERENCES "addons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_cats_addon_cats_locations" ADD CONSTRAINT "menu_cats_addon_cats_locations_addon_cat_id_fkey" FOREIGN KEY ("addon_cat_id") REFERENCES "addon_cats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_cats_addon_cats_locations" ADD CONSTRAINT "menu_cats_addon_cats_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu_cats_addon_cats_locations" ADD CONSTRAINT "menu_cats_addon_cats_locations_menu_cat_id_fkey" FOREIGN KEY ("menu_cat_id") REFERENCES "menu_cats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_addon_cats" ADD CONSTRAINT "menus_addon_cats_addon_cat_id_fkey" FOREIGN KEY ("addon_cat_id") REFERENCES "addon_cats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_addon_cats" ADD CONSTRAINT "menus_addon_cats_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_locations" ADD CONSTRAINT "menus_locations_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_locations" ADD CONSTRAINT "menus_locations_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_cats" ADD CONSTRAINT "menus_menu_cats_menu_cat_id_fkey" FOREIGN KEY ("menu_cat_id") REFERENCES "menu_cats"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menus_menu_cats" ADD CONSTRAINT "menus_menu_cats_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

