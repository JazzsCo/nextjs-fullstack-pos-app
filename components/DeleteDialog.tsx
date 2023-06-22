import { useState } from "react";

import Dialog from "@mui/material/Dialog";
import { Button } from "@material-tailwind/react";

import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useRouter } from "next/router";

interface Props {
  callback: () => void;
}

const DeleteDialog = ({ callback }: Props) => {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleOpen = () => setOpen(!open);

  const handleClick = () => {
    callback();
    router.push("/admin/tables");
  };

  return (
    <div>
      <Button onClick={handleOpen} color="deep-orange">
        Delete
      </Button>

      <Dialog open={open} onClose={handleOpen}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
          <Button color="deep-orange" onClick={handleClick}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
