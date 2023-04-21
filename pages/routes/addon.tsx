import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Layout from "../components/Layout";

export default function Addon() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const menu = {
      name: formData.get("name"),
      prize: formData.get("prize"),
    };

    await axios
      .post("/api/menus-post", {
        menu,
      })
      .then((res) => {
        console.log(res.data);
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <Layout>
      <Box
        component="form"
        sx={{
          maxWidth: "20rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "0 auto",
          marginY: 15,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="Addon Name"
          variant="standard"
          sx={{ mb: 1 }}
          color="primary"
          focused
          name="name"
        />
        <TextField
          id="standard-basic"
          label="Prize"
          type="number"
          variant="standard"
          sx={{ mb: 2 }}
          color="primary"
          focused
          name="prize"
        />
        <Button type="submit" variant="outlined">
          Create Menus
        </Button>
      </Box>
    </Layout>
  );
}
