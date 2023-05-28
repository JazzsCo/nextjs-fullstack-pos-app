/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InfoIcon from "@mui/icons-material/Info";
import { Button, Modal } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "@/contexts/AppContext";
import Layout from "@/components/Layout";
import ButtonSide from "./ButtonSide";
import Link from "next/link";
import {
  Addon,
  AddonAddonCat,
  AddonCategory,
  Menu,
  MenuCategory,
  MenusAddonCat,
  MenusMenuCat,
} from "@/typings/types";
import { useRouter } from "next/router";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  borderColor: "white",
  p: 4,
};

export default function Menus() {
  const {
    locations,
    menus,
    menuCategories,
    addonCategories,
    addons,
    menusAddonCat,
    menusMenuCat,
    addonAddonCat,
    updateData,
    ...data
  } = useContext(AppContext);

  // const [menus, setMenus] = useState<Menu[]>([]);
  // const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  // const [addonCategories, setAddonCategories] = useState<AddonCategory[]>([]);
  // const [addons, setAddons] = useState<Addon[]>([]);
  // const [addonAddonCat, setAddonAddonCat] = useState<AddonAddonCat[]>([]);
  // const [menusAddonCat, setMenusAddonCat] = useState<MenusAddonCat[]>([]);
  // const [menusMenuCat, setMenusMenuCat] = useState<MenusMenuCat[]>([]);

  console.log("menu", menus);
  console.log("menu cat", menuCategories);
  console.log("addon cat", addonCategories);
  console.log("addons", addons);
  console.log("addon addon cat", addonAddonCat);
  console.log("menu addon cat", menusAddonCat);
  console.log("menu menu cat", menusMenuCat);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getMenusByLocationId = async (id: string) => {
    const url = `/api/menusPost?id=${id}`;

    await axios
      .get(url)
      .then((res) => {
        const {
          menus,
          menuCategories,
          addonCategories,
          addons,
          addonAddonCat,
          menusAddonCat,
          menusMenuCat,
        } = res.data;

        updateData({
          locations,
          menus,
          menuCategories,
          addonCategories,
          addons,
          menusAddonCat,
          menusMenuCat,
          addonAddonCat,
          updateData,
          ...data,
        });

        // setMenus(menus);
        // setMenuCategories(menuCategories);
        // setAddonCategories(addonCategories);
        // setAddons(addons);
        // setAddonAddonCat(addonAddonCat);
        // setMenusAddonCat(menusAddonCat);
        // setMenusMenuCat(menusMenuCat);
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  useEffect(() => {
    if (locations.length) {
      const locationId = localStorage.getItem("locationId");
      if (!locationId) {
        localStorage.setItem("locationId", String(locations[0].id));
        return;
      } else {
        getMenusByLocationId(locationId);
      }
    }
  }, [locations]);

  const menusCat = (id: number) => {
    const menuMenuCatIds = menusMenuCat
      .filter((menuCat) => menuCat.menus_id === id)
      .map((menuCat) => menuCat.category_id);

    const menuCatNames = menuCategories
      .filter((menuCat) => menuMenuCatIds.includes(menuCat.id))
      .map((menuCat) => menuCat.category_name);

    return (
      <div>
        {menuCatNames.map((menuCat, index) => (
          <div key={index}> {menuCat}</div>
        ))}
      </div>
    );
  };

  return (
    <Layout>
      <div>
        {menus &&
          menus.map((menu, index) => (
            <div key={index} className="flex flex-col items-center my-28">
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img
                  className="p-8 rounded-[2.5rem]"
                  src={menu.image_url}
                  alt="product image"
                />

                <div className="px-5 pb-5">
                  <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {menu.location_name}
                  </h3>
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {menu.menu_name}
                  </h5>

                  <div className="flex items-center mt-2.5 mb-5">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>First star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Second star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Third star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Fourth star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Fifth star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${menu.price}
                    </span>
                    <div>
                      <Button variant="outlined" onClick={handleOpen}>
                        <InfoIcon />
                        {/* Update Menu */}
                      </Button>

                      <Modal
                        sx={{}}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box sx={style}>
                          {/* <form onSubmit={() => {}}>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Name
                              </label>
                              <input
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={menu?.menu_name}
                                name="name"
                                required
                              />
                            </div>
                            <div className="mb-6">
                              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Price
                              </label>
                              <input
                                type="number"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                defaultValue={menu?.price}
                                name="price"
                                required
                              />
                            </div>
                            <div className="flex justify-end">
                              <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                Update
                              </button>
                            </div>
                          </form> */}

                          <img
                            className="p-8 rounded-[2.5rem]"
                            src={menu.image_url}
                            alt="product image"
                          />

                          <div>{menusCat(menu.id)}</div>

                          <div className="px-5 pb-5">
                            <h3 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                              {menu.location_name}
                            </h3>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                              {menu.menu_name}
                            </h5>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                              ${menu.price}
                            </span>
                          </div>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </Layout>
  );
}
