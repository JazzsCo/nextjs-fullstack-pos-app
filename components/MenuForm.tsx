import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import FileDropZone from "./FileDropZone";
import LocationsSelect from "./LocationsSelect";
import axios from "axios";
import AddonCatSelect from "./AddonCatSelect";
import MenuCatSelect from "./MenuCatSelect";
import { menu_cats, menus_menu_cats_locations } from "@prisma/client";
import { LocationId } from "@/libs/locationId";
import { Button, Input, Typography } from "@material-tailwind/react";
import Dialog from "@mui/material/Dialog";

export default function MunuForm() {
  const locationId = Number(LocationId());

  const {
    menuCategories,
    addonCategories,
    addons,
    menusMenuCatAddonCatLocation,
    fetchData,
  } = useContext(AppContext);

  const menuCatId = menusMenuCatAddonCatLocation
    .filter(
      (item: menus_menu_cats_locations) => item.location_id === locationId
    )
    .map((item: menus_menu_cats_locations) => item.menu_cat_id)
    .filter((item: any) => typeof item === "number") as number[];

  const menuCatByLocId = menuCategories.filter((item: menu_cats) =>
    menuCatId.includes(item.id)
  );

  const imageEndPoint = `/api/image`;
  const createMenuEndPoint = `/api/menusPost`;

  const [menuImage, setMenuImage] = useState<File>();

  const [menu, setMenu] = useState({
    name: "",
    price: 0,
    // imageUrl: "",
    locationIds: [],
    menuCatIds: [],
    // addonCatIds: [],
    // addonIds: [],
  });

  const onFileSelected = (files: File[]) => {
    setMenuImage(files[0]);
  };

  const locationStateChange = (childStateSelectedLocationIds: any) => {
    setMenu({ ...menu, locationIds: childStateSelectedLocationIds });
  };

  const menuCatStateChange = (childStateSelectedMenuCatIds: any) => {
    setMenu({ ...menu, menuCatIds: childStateSelectedMenuCatIds });
  };

  // const addonCatStateChange = (childStateSelectedAddonCatIds: any) => {
  //   setMenu({ ...menu, addonCatIds: childStateSelectedAddonCatIds });
  // };

  // const addonStateChange = (childStateSelectedAddonIds: any) => {
  //   setMenu({ ...menu, addonIds: childStateSelectedAddonIds });
  // };

  const createMenu = async () => {
    try {
      if (menuImage) {
        console.log("has menu image");
        const formData = new FormData();
        formData.append("files", menuImage as Blob);
        const response = await fetch(imageEndPoint, {
          method: "POST",
          body: formData,
        });
        const { imageUrl } = await response.json();
        // setMenu({ ...menu, imageUrl: imageUrl });

        if (imageUrl) {
          const res = await axios.post(createMenuEndPoint, { menu, imageUrl });
          console.log(res);
        }

        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(menu);

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Create Menu
      </Button>
      <Dialog open={open} onClose={handleOpen}>
        <div className="px-[2rem] py-[3rem]">
          <div>
            <Typography variant="h5" color="blue-gray">
              Create A New Menu
            </Typography>

            <div className="mt-10 space-y-4">
              <div className="flex justify-normal">
                <div className="max-w-md space-y-5 mr-10">
                  <Input
                    type="text"
                    label="Menu Name"
                    onChange={(e) => setMenu({ ...menu, name: e.target.value })}
                  />

                  <Input
                    type="number"
                    label="Price"
                    onChange={(e) =>
                      setMenu({ ...menu, price: Number(e.target.value) })
                    }
                  />

                  <FileDropZone onFileSelected={onFileSelected} />
                </div>
                <div className="space-y-3">
                  <LocationsSelect onStateChange={locationStateChange} />

                  <MenuCatSelect
                    menuCategories={menuCatByLocId}
                    onStateChange={menuCatStateChange}
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
              <div className="text-right">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={createMenu}
                >
                  Default
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
