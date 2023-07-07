import axios from "axios";
import { tables } from "@prisma/client";
import { useContext, useState } from "react";

import Dialog from "@mui/material/Dialog";
import { Button, Input } from "@material-tailwind/react";

import { AdminContext } from "@/contexts/AdminContext";

interface Props {
  table: tables;
}

const TableCreate = ({ table }: Props) => {
  const { fetchData } = useContext(AdminContext);

  const [open, setOpen] = useState(false);

  const [updateTableName, setUpdateTableName] = useState(table?.name);

  const handleOpen = () => setOpen(!open);

  const updateTable = async () => {
    await axios.put(`/api/admin/tables?id=${table.id}`, { updateTableName });

    fetchData();
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
          <Button onClick={updateTable} variant="gradient">
            Update Table
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default TableCreate;
