import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import { AdminContext } from "@/contexts/AdminContext";
import DeleteDialog from "@/components/DeleteDialog";

import type { addons } from "@prisma/client";

const AddonById = () => {
  const { addons, fetchData } = useContext(AdminContext);

  const router = useRouter();
  const { id } = router.query;

  const currentAddon = addons.filter(
    (item: addons) => item.id === Number(id)
  )[0];

  const deleteAddon = async () => {
    await axios.delete(`/api/admin/addons?id=${id}`);

    router.push("/admin/addons");

    fetchData();
  };

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <div className="flex justify-around space-x-2 mr-2">
          <DeleteDialog callback={deleteAddon} />
        </div>
      </div>
      <div className="w-[10rem] h-[7rem] ml-[18rem] my-16 flex flex-col items-center justify-center bg-blue-gray-200 rounded-md">
        <h1>{currentAddon?.addon_name}</h1>
      </div>
    </Layout>
  );
};

export default AddonById;
