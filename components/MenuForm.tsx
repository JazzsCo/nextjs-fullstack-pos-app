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
        <div className="flex flex-col justify-center px-20 py-14 space-y-4 ml-9">
          <Typography variant="h3" color="blue-gray">
            Create A New Menu
          </Typography>

          <div className=" space-y-5 mr-10 max-w-[280px]">
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
          <LocationsSelect onStateChange={locationStateChange} />

          <Button onClick={createMenu} className="max-w-[280px]">
            Create
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
