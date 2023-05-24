import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import AddonSelect from "./AddonSelect";
import FileDropZone from "./FileDropZone";
import LocationsSelect from "./LocationsSelect";
import MenuCatSelect from "./MenuCatSelect";
import AddonCatSelect from "./AddonCatSelect";
import axios from "axios";

export default function MunuForm() {
  const { menuCategories, addonCategories, addons, fetchData } =
    useContext(AppContext);

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const imageEndPoint = `${apiBaseUrl}/image`;
  const createMenuEndPoint = `${apiBaseUrl}/menusPost`;

  const [menuImage, setMenuImage] = useState<File>();

  const [menu, setMenu] = useState({
    name: "",
    price: 0,
    // imageUrl: "",
    locationIds: [],
    menuCatIds: [],
    addonCatIds: [],
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

  const addonCatStateChange = (childStateSelectedAddonCatIds: any) => {
    setMenu({ ...menu, addonCatIds: childStateSelectedAddonCatIds });
  };

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

  return (
    <div className="w-full max-w-3xl px-28 py-7 m-auto mt-12  bg-slate-100 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>
        <p className="font-semibold text-xl">Create A New Menu</p>
        <div className="mt-10 space-y-4">
          {/* <div className="max-w-md sm:col-span-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Location Name
            </label>
            <div className="mt-2">
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Ma Ma"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}

          <div className="flex justify-normal">
            <div className="max-w-sm space-y-5 mr-14">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Menu Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ah Toke"
                    onChange={(e) => setMenu({ ...menu, name: e.target.value })}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="0000"
                    onChange={(e) =>
                      setMenu({ ...menu, price: Number(e.target.value) })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <a href=""></a>
              </div>

              <FileDropZone onFileSelected={onFileSelected} />

              <div className="flex items-center">
                <input
                  disabled
                  checked
                  id="disabled-checked-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="disabled-checked-checkbox"
                  className="ml-2 text-sm font-medium text-gray-400 dark:text-gray-500"
                >
                  Available
                </label>
              </div>
            </div>
            <div className="space-y-3">
              <LocationsSelect onStateChange={locationStateChange} />

              <MenuCatSelect onStateChange={menuCatStateChange} />

              <AddonCatSelect onStateChange={addonCatStateChange} />

              {/* <AddonCatSelect onStateChange={addonCatStateChange} />

              <AddonSelect onStateChange={addonStateChange} /> */}
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
  );
}
