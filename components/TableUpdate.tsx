import axios from "axios";
import { tables } from "@prisma/client";
import { useContext, useState } from "react";

import Dialog from "@mui/material/Dialog";
import { Button, Input } from "@material-tailwind/react";

import { useAppDispatch } from "@/store/hooks";
import { updateTable } from "@/store/slices/tablesSlice";

interface Props {
  table: tables;
}

const TableCreate = ({ table }: Props) => {
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);

  const [updateTableName, setUpdateTableName] = useState(table?.name);

  const handleOpen = () => setOpen(!open);

  const handleUpdateTable = async () => {
    const res = await axios.put(`/api/admin/tables?id=${table.id}`, {
      updateTableName,
    });

    const { tableUpdate } = res.data;

    dispatch(updateTable(tableUpdate));
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Update Table
      </Button>

      <Dialog open={open} onClose={handleOpen}>
        <div className="flex flex-col items-center px-20 py-28 space-y-3">
          <div className="w-[280px]">
            <Input
              type="text"
              label="Table Name"
              defaultValue={updateTableName}
              onChange={(e) => setUpdateTableName(e.target.value)}
            />
          </div>
          <Button onClick={handleUpdateTable} variant="gradient">
            Update Table
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default TableCreate;
