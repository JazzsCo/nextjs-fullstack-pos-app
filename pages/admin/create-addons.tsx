import Layout from "@/components/Layout";
import { Box, TextField, Button } from "@mui/material";
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

const CreateAddons = () => {
  const locationId = Number(LocationId());

  const {
    // addonCategories,
    // addons,
    // menusAddonCat,
    // addonAddonCat,
    // menusMenuCatAddonCatLocation,
    fetchData,
  } = useContext(AppContext);

  const [addonCategories, setAddonCategories] = useState<addon_cats[]>();

  const [count, setCount] = useState(0);
  const [addonCatName, setAddonCatName] = useState({
    name: "",
    menuIds: [],
  });
  const [addonName, setAddonName] = useState<String[]>([]);
  const [addonPrice, setAddonPrice] = useState<Number[]>([]);

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

  const menuStateChange = (childStateSelectedMenuIds: any) => {
    setAddonCatName({
      ...addonCatName,
      menuIds: childStateSelectedMenuIds,
    });
  };

  const createAddon = async () => {
    const res = await axios.post(`/api/createAddon`, {
      addonCatName,
      addonName,
      addonPrice,
    });

    console.log(res);

    setAddonCatName({
      name: "",
      menuIds: [],
    });
    setAddonName([]);
    setAddonPrice([]);
    setCount(0);

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

  return (
    <Layout>
      <Box>
        <Box
          sx={{
            maxWidth: "20rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "0 auto",
            marginY: 15,
          }}
        >
          <TextField
            id="standard-basic"
            label="Addon Category Name"
            variant="standard"
            sx={{ mb: 1 }}
            color="primary"
            focused
            value={addonCatName.name}
            onChange={(e) =>
              setAddonCatName({ ...addonCatName, name: e.target.value })
            }
          />

          <MenuSelect onStateChange={menuStateChange} />

          {addonIds &&
            addonIds.map((e, index) => (
              <Box
                key={index}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <TextField
                  id="standard-basic"
                  label="Addon Name"
                  variant="standard"
                  sx={{ mb: 1, mr: 3 }}
                  color="primary"
                  focused
                  onChange={(e) => addonNames(e, index)}
                />

                <TextField
                  id="standard-basic"
                  label="Price"
                  variant="standard"
                  type="number"
                  sx={{ mb: 1 }}
                  color="primary"
                  focused
                  onChange={(e) => addonPrices(e, index)}
                />
              </Box>
            ))}

          <Button
            sx={{
              display: "flex",
              justifyContent: "center",
              m: 2,
              cursor: "pointer",
            }}
            onClick={() => {
              setCount(count + 1);
            }}
          >
            <AddCircleIcon color="primary" />
          </Button>

          <Button onClick={createAddon} variant="outlined">
            Create Addons
          </Button>
        </Box>

        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <AddonCatSelect addonCategories={addonCategories} />
        </Box>
      </Box>
    </Layout>
  );
};

export default CreateAddons;
