import Layout from "@/components/Layout";
import { Box, TextField, Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React, { useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "@/contexts/AppContext";
import LocationsSelect from "@/components/LocationsSelect";

const CreateAddons = () => {
  const { fetchData } = useContext(AppContext);

  const url = `/api/createAddon`;

  const [count, setCount] = useState(0);
  const [addonCatName, setAddonCatName] = useState({
    name: "",
    locationIds: [],
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

  const locationStateChange = (childStateSelectedLocationIds: any) => {
    setAddonCatName({
      ...addonCatName,
      locationIds: childStateSelectedLocationIds,
    });
  };

  const createAddon = async () => {
    const res = await axios.post(url, {
      addonCatName,
      addonName,
      addonPrice,
    });

    console.log(res);

    setAddonCatName({
      name: "",
      locationIds: [],
    });
    setAddonName([]);
    setAddonPrice([]);
    setCount(0);

    fetchData();
  };

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
            value={addonCatName}
            onChange={(e) =>
              setAddonCatName({ ...addonCatName, name: e.target.value })
            }
          />

          <LocationsSelect onStateChange={locationStateChange} />

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
      </Box>
    </Layout>
  );
};

export default CreateAddons;
