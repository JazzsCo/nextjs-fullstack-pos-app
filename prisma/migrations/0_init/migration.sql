-- CreateTable
CREATE TABLE "addon" (
    "id" SERIAL NOT NULL,
    "addon_name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "is_avilable" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "addon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addon_addon_categories" (
    "id" SERIAL NOT NULL,
    "addon_id" INTEGER NOT NULL,
    "addon_cat_id" INTEGER NOT NULL,

    CONSTRAINT "addon_addon_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addon_categories" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "addon_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "location_menus" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "is_available" BOOLEAN DEFAULT true,

    CONSTRAINT "location_menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_categories" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "menu_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu_images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "menu_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image_url" TEXT,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_addon_categories" (
    "id" SERIAL NOT NULL,
    "menus_id" INTEGER NOT NULL,
    "addon_cat_id" INTEGER NOT NULL,

    CONSTRAINT "menus_addon_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_menu_categories" (
    "id" SERIAL NOT NULL,
    "menus_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "menus_menu_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_menu_images" (
    "id" SERIAL NOT NULL,
    "menus_id" INTEGER NOT NULL,
    "menu_images_id" INTEGER NOT NULL,

    CONSTRAINT "menus_menu_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menus_order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "is_avilable" BOOLEAN DEFAULT false,

    CONSTRAINT "menus_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

