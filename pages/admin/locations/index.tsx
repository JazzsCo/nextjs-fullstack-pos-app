import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Layout from "@/components/Layout";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { addLocation } from "@/store/slices/locationsSlice";

export default function Locations() {
  const { locations } = useAppSelector(appData);
  const dispatch = useAppDispatch();

  const [name, setname] = useState("");

  const createLocation = async () => {
    if (!name) return console.log("This is empty...");

    const res = await axios.post(`/api/admin/locations`, {
      name,
    });

    const { location } = res.data;

    dispatch(addLocation(location));

    setname("");
  };

  return (
    <Layout>
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
        <div className="m-5">
          {locations.map(({ id, location_name }) => (
            <h1 key={id}>{location_name}</h1>
          ))}
        </div>
        <TextField
          id="standard-basic"
          label="Location Name"
          variant="standard"
          sx={{ mb: 1 }}
          color="primary"
          value={name}
          focused
          onChange={(e) => setname(e.target.value)}
        />
        <Button onClick={createLocation} variant="outlined">
          Create Location
        </Button>
      </Box>
    </Layout>
  );
}
