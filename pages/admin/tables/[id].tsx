import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AdminContext } from "@/contexts/AdminContext";
import TableUpdate from "@/components/TableUpdate";
import DeleteDialog from "@/components/DeleteDialog";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const TableById = () => {
  const router = useRouter();
  const { id } = router.query;

  const { tables } = useAppSelector(appData);

  const table = tables.filter((table) => table.id === Number(id))[0];

  const deleteTable = async () => {
    await axios.delete(`/api/admin/tables?id=${id}`);

    router.push("/admin/tables");

    // fetchData();
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <div className="flex justify-around space-x-2 mr-2">
          <TableUpdate table={table} />
          <DeleteDialog callback={deleteTable} />
        </div>
      </div>

      <div className="ml-[17rem] mt-16 flex justify-start space-x-3">
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-[10rem] h-[7rem] cursor-pointer hover:bg-blue-gray-400 flex flex-col items-center justify-center bg-blue-gray-200 rounded-md">
            <h1>{table?.name} Table</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TableById;
