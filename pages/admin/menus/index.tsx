import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "@/contexts/AppContext";
import { LocationId } from "@/libs/locationId";
import type { menus } from "@prisma/client";

import Layout from "@/components/Layout";
import MenuCreate from "@/components/MenuCreate";
import { getMenuIdsByLocationId } from "@/libs/custom";

export default function Menus() {
  const locationId = Number(LocationId());

  const { menus, menusLocation } = useContext(AppContext);

  const menuIds = getMenuIdsByLocationId(locationId, menusLocation);

  const getMenusByLocationId = menus.filter((item: menus) =>
    menuIds.includes(item.id)
  );

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <MenuCreate />
      </div>
      <div className="flex my-16 gap-3 ml-[18rem] flex-wrap">
        {getMenusByLocationId.map((menu: menus) => (
          <Link
            className="w-full max-w-sm bg-white hover:bg-gray-100 border border-gray-200 cursor-pointer rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            key={menu.id}
            href={`/admin/menus/${menu.id}`}
          >
            <img
              className="p-8 rounded-[2.5rem] max-w-[18rem]"
              src={menu.image_url}
              alt="product image"
            />

            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {menu.name}
              </h5>

              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${menu.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
