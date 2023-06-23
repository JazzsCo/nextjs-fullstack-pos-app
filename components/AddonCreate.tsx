import axios from "axios";
import { useContext, useState } from "react";

import { Dialog } from "@mui/material";
import { Button, Input } from "@material-tailwind/react";
import AddonCatSelect from "./AddonCatSelect";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { AppContext } from "@/contexts/AppContext";
import { addon_cats } from "@prisma/client";

interface Props {
  addonCategories: addon_cats[];
}

const AddonCreate = ({ addonCategories }: Props) => {
  const [open, setOpen] = useState(false);

  const [count, setCount] = useState(0);

  const [addonCatName, setAddonCatName] = useState({
    addonIds: [],
  });
  const [addonName, setAddonName] = useState<String[]>([]);
  const [addonPrice, setAddonPrice] = useState<Number[]>([]);

  const { fetchData } = useContext(AppContext);

  const handleOpen = () => {
    setOpen(!open);
    setAddonCatName({
      addonIds: [],
    });
    setAddonName([]);
    setAddonPrice([]);
    setCount(0);
  };

  const addonIds = Array.from({ length: count }, (_, index) => index + 1);

  const addonNames = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedValues = [...addonName];
    updatedValues[index] = e.target.value;
    setAddonName(updatedValues);
  };

  const addonPrices = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedValues = [...addonPrice];
    updatedValues[index] = Number(e.target.value);
    setAddonPrice(updatedValues);
  };

  const addonStateChange = (childStateSelectedAddonCatIds: any) => {
    setAddonCatName({
      ...addonCatName,
      addonIds: childStateSelectedAddonCatIds,
    });
  };

  const createAddon = async () => {
    const res = await axios.post(`/api/createAddon`, {
      addonCatName,
      addonName,
      addonPrice,
    });

    fetchData();
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Create Addon
      </Button>

      <Dialog open={open} onClose={handleOpen}>
        <div className="w-full flex flex-col items-center px-20 py-24 space-y-1">
          <div className="flex flex-col justify-center space-y-3">
            {addonIds &&
              addonIds.map((e, index) => (
                <div key={index} className="flex justify-around space-x-3">
                  <Input
                    type="text"
                    label="Addon Name"
                    onChange={(e) => addonNames(e, index)}
                  />

                  <Input
                    type="number"
                    label="Price"
                    onChange={(e) => addonPrices(e, index)}
                  />
                </div>
              ))}

            <div className="flex flex-row justify-center">
              <button
                onClick={() => {
                  setCount(count + 1);
                }}
                className="text-white w-[30px] h-[30px] bg-blue-500 rounded-full"
              >
                <AddCircleIcon />
              </button>
            </div>
          </div>
          <AddonCatSelect
            onStateChange={addonStateChange}
            addonCategories={addonCategories}
          />
          <Button onClick={createAddon} variant="gradient">
            Create Addon
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default AddonCreate;
