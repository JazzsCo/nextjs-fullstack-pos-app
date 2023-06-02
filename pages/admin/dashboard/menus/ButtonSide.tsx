import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { Menu } from "@/typings/types";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 2,
  borderColor: "white",
  p: 4,
};

interface Props {
  menu: Menu;
  fetchData?: () => void;
  menusCat: (id: number) => JSX.Element;
  addonsCat: (id: number) => JSX.Element;
}

export default function BasicModal({ menu, menusCat, addonsCat }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const id = menu?.id;

  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const menu = {
  //     name: formData.get("name"),
  //     price: formData.get("price"),
  //   };
  //   await axios
  //     .put(`/api/menusPost?id=${id}`, {
  //       menu,
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       return res;
  //     })
  //     .catch((err) => {
  //       return err;
  //     });
  //   fetchData();
  // };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Update Menu
      </Button>

      <Modal
        sx={{}}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            className="p-8 rounded-[2.5rem]"
            src={menu.image_url}
            alt="product image"
          />

          <h1>{menu.name}</h1>
          <h1>{menu.price}</h1>
          {menusCat(menu.id)}
          {addonsCat(menu.id)}
        </Box>
      </Modal>
    </div>
  );
}
