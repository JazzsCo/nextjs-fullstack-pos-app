import Link from "next/link";

import { menus } from "@prisma/client";

interface Props {
  menus: menus[];
  query?: any;
}

const MenuCards = ({ menus, query }: Props) => {
  return (
    <div className="flex flex-wrap justify-start ml-[18rem] space-x-4 space-y-3">
      {menus.map((item: menus) => (
        <Link
          key={item.id}
          href={{ pathname: `/order/menus/${item.id}`, query: query }}
          className="w-full max-w-sm bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <img
            src={item.image_url}
            alt="product image"
            className="p-8 rounded-[2.5rem] max-w-[18rem]"
          />
          <div className="px-5 pb-5">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {item.name}
            </h5>

            <div className="flex flex-col float-left space-y-3">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${item.price}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuCards;
