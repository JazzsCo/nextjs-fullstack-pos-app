/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useContext } from "react";
import { AppContext } from "@/pages/contexts/AppContext";
import Layout from "@/pages/components/Layout";
import ButtonSide from "./ButtonSide";
import Link from "next/link";

export default function Menus() {
  const { fetchData, menus } = useContext(AppContext);

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    // const menu = {
    //   name: formData.get("name"),
    //   price: formData.get("price"),
    // };
    // await axios
    //   .post("/api/menusPost", {
    //     menu,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     return res;
    //   })
    //   .catch((err) => {
    //     return err;
    //   });
    // fetchData();
  };

  const handleDeleteMenu = async (id: any) => {
    // await axios
    //   .delete(`/api/deleteMenu?id=${id}`)
    //   .then((res) => {
    //     console.log(res);
    //     return res;
    //   })
    //   .catch((err) => {
    //     return err;
    //   });
    // fetchData();
  };

  const handleClickMenu = () => {};

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
      <div className="m-auto max-w-lg space-x-3">
        {menus.map((menu) => (
          <Link href={`/routes/menus/${menu.id}`} key={menu.id}>
            <Chip
              label={`${menu.name}`}
              onDelete={handleDeleteMenu}
              onClick={handleClickMenu}
              sx={{ mb: 2 }}
              //   Chip have cusor-pointer auto
            />
          </Link>
        ))}
      </div>

      {/* <div className="flex justify-around flex-wrap space-y-5">
        {menus.map((menu) => {
          return (
            <div
              key={menu.id}
              className="max-w-sm bg-slate-300 border text-xl text-slate-950 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img className="h-auto rounded-lg" src={menu.url} alt="..." />
              <h1>{menu.name}</h1>
              <h3>${menu.price}</h3>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Update
              </button>
            </div>
          );
        })}
      </div> */}
    </Layout>
  );
}
