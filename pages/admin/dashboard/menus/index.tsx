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
    // menus,
    // menuCategories,
    // addonCategories,
    // addons,
    // menusAddonCat,
    // menusMenuCat,
    // addonAddonCat,
    updateData,
    ...data
  } = useContext(AppContext);

  const [menus, setMenus] = useState<Menu[]>([]);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const [addonCategories, setAddonCategories] = useState<AddonCategory[]>([]);
  const [addons, setAddons] = useState<Addon[]>([]);
  const [addonAddonCat, setAddonAddonCat] = useState<AddonAddonCat[]>([]);
  const [menusAddonCat, setMenusAddonCat] = useState<MenusAddonCat[]>([]);
  const [menusMenuCat, setMenusMenuCat] = useState<MenusMenuCat[]>([]);

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

        // updateData({
        //   locations,
        //   menus,
        //   menuCategories,
        //   addonCategories,
        //   addons,
        //   menusAddonCat,
        //   menusMenuCat,
        //   addonAddonCat,
        //   updateData,
        //   ...data,

        // });

        setMenus(menus);
        setMenuCategories(menuCategories);
        setAddonCategories(addonCategories);
        setAddons(addons);
        setAddonAddonCat(addonAddonCat);
        setMenusAddonCat(menusAddonCat);
        setMenusMenuCat(menusMenuCat);
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
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {menu.name}
                  </h5>

                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ${menu.price}
                    </span>
                    <div>
                      {/* <button onClick={() => setOpen(!open)}></button> */}

                      <button
                        data-modal-target="defaultModal"
                        data-modal-toggle="defaultModal"
                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                      >
                        hello <InfoIcon />
                      </button>

                      <div
                        id="defaultModal"
                        tabIndex={-1}
                        aria-hidden="false"
                        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
                      >
                        <div className="relative w-full max-w-2xl max-h-full">
                          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Terms of Service
                              </h3>
                              <button
                                type="button"
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="defaultModal"
                              >
                                <svg
                                  aria-hidden="true"
                                  className="w-5 h-5"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                  ></path>
                                </svg>
                                <span className="sr-only">Close modal</span>
                              </button>
                            </div>
                            <div className="p-6 space-y-6">
                              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                With less than a month to go before the European
                                Union enacts new consumer privacy laws for its
                                citizens, companies around the world are
                                updating their terms of service agreements to
                                comply.
                              </p>
                              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                The European Union’s General Data Protection
                                Regulation (G.D.P.R.) goes into effect on May 25
                                and is meant to ensure a common set of data
                                rights in the European Union. It requires
                                organizations to notify users as soon as
                                possible of high-risk data breaches that could
                                personally affect them.
                              </p>
                            </div>
                            <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                              <button
                                data-modal-hide="defaultModal"
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                I accept
                              </button>
                              <button
                                data-modal-hide="defaultModal"
                                type="button"
                                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                              >
                                Decline
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* <Modal
                        sx={{}}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      > 
                        <Box sx={style}>
                          <form onSubmit={() => {}}>
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
                          </form>
                        </Box>
                       </Modal> */}
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
