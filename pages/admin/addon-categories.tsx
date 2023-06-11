import Layout from "@/components/Layout";
import { Box, TextField, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";
import LocationsSelect from "@/components/LocationsSelect";
import { LocationId } from "@/libs/locationId";
import MenuCatSelect from "@/components/MenuCatSelect";
import MenuSelect from "@/components/MenuSelect";
import { addon_cats } from "@prisma/client";
import AddonCatSelect from "@/components/AddonCatSelect";
import { Button, Input } from "@material-tailwind/react";

const AddonCategory = () => {
  const locationId = Number(LocationId());

  const { fetchData } = useContext(AppContext);

  const [addonCategories, setAddonCategories] = useState<addon_cats[]>();

  const [addonCatName, setAddonCatName] = useState({
    name: "",
    menuIds: [],
  });

  const menuStateChange = (childStateSelectedMenuIds: any) => {
    setAddonCatName({
      ...addonCatName,
      menuIds: childStateSelectedMenuIds,
    });
  };

  const createAddon = async () => {
    const res = await axios.post(`/api/addonCategory`, {
      addonCatName,
    });

    console.log(res);

    setAddonCatName({
      name: "",
      menuIds: [],
    });

    fetchData();
  };

  const getAddon = async (id: number) => {
    const res = await axios.get(`/api/createAddon?id=${id}`);
    const { addonCategories } = res.data;

    setAddonCategories(addonCategories);

    console.log("sldsdsldsd", addonCategories, id);
  };

  useEffect(() => {
    getAddon(locationId);
  }, [locationId]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setAddonCatName({
      name: "",
      menuIds: [],
    });
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <Button onClick={handleOpen} variant="gradient">
          Create Addon Category
        </Button>
      </div>

      <Dialog open={open} onClose={handleOpen}>
        <div className="w-full flex flex-col items-center px-20 py-24 space-y-3">
          <div className="w-[280px]">
            <Input
              type="text"
              label="Addon Category Name"
              onChange={(e) =>
                setAddonCatName({ ...addonCatName, name: e.target.value })
              }
            />
          </div>
          <MenuSelect onStateChange={menuStateChange} />

          <Button onClick={createAddon} variant="gradient">
            Create Addon Category
          </Button>
        </div>
      </Dialog>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AddonCatSelect addonCategories={addonCategories} />
      </Box>
    </Layout>
  );
};

export default AddonCategory;
