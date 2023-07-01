-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PREPARING', 'COMPLETE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin');

-- CreateTable
CREATE TABLE "orders" (
    "id" SERIAL NOT NULL,
    "locations_id" INTEGER NOT NULL,
    "tables_id" INTEGER NOT NULL,
    "is_paid" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER DEFAULT 0,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderlines" (
    "id" SERIAL NOT NULL,
    "orders_id" INTEGER NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "addons_id" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "order_status" "OrderStatus" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "orderlines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_locations_id_fkey" FOREIGN KEY ("locations_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_tables_id_fkey" FOREIGN KEY ("tables_id") REFERENCES "tables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderlines" ADD CONSTRAINT "orderlines_orders_id_fkey" FOREIGN KEY ("orders_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderlines" ADD CONSTRAINT "orderlines_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orderlines" ADD CONSTRAINT "orderlines_addons_id_fkey" FOREIGN KEY ("addons_id") REFERENCES "addons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
