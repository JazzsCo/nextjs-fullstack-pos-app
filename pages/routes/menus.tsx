import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Layout from "../components/Layout";
import { AppContext } from "../contexts/AppContext";
import Chip from "@mui/material/Chip";

export default function Menus() {
  const { fetchData, menus } = React.useContext(AppContext);
  console.log(menus);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const menu = {
      name: formData.get("name"),
      price: formData.get("price"),
    };

    await axios
      .post("/api/menusPost", {
        menu,
      })
      .then((res) => {
        console.log(res.data);
        return res;
      })
      .catch((err) => {
        return err;
      });

    fetchData();
  };

  const handleDeleteMenu = async (id: any) => {
    await axios
      .delete(`/api/deleteMenu?id=${id}`)
      .then((res) => {
        console.log(res);
        return res;
      })
      .catch((err) => {
        return err;
      });

    fetchData();
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
          label="Name"
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
          name="price"
        />
        <Button type="submit" variant="outlined">
          Create Menus
        </Button>
      </Box>
      <Box>
        {menus.map((menu) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Chip
              key={menu.id}
              label={menu.name}
              sx={{ m: 1 }}
              onDelete={() => handleDeleteMenu(menu.id)}
            />
          );
        })}
      </Box>
    </Layout>
  );
}
