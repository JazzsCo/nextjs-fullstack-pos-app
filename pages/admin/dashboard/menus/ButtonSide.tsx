import { Fragment, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import type { menus as Menu } from "@prisma/client";

interface Props {
  menu: Menu;
  fetchData?: () => void;
  menusCat: (id: number) => JSX.Element;
  addonsCat: (id: number) => JSX.Element;
}

export default function BasicModal({ menu, menusCat, addonsCat }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

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
    <Fragment>
      <Button onClick={handleOpen} variant="gradient">
        Menu Info
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Its a simple dialog.</DialogHeader>
        <DialogBody divider>
          <img
            className="p-8 rounded-[2.5rem]"
            src={menu.image_url}
            alt="product image"
          />

          <h1>{menu.name}</h1>
          <h1>{menu.price}</h1>
          {menusCat(menu.id)}
          {addonsCat(menu.id)}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
