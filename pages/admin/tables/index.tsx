import { useContext, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { AdminContext } from "@/contexts/AdminContext";
import axios from "axios";
import { LocationId } from "@/libs/locationId";
import { tables } from "@prisma/client";
import TableCreate from "@/components/TableCreate";

const Tables = () => {
  const { tables } = useContext(AdminContext);

  const locationId = LocationId();

  const validTables = tables.filter(
    (item) => item.locations_id === Number(locationId)
  );

  return (
    <Layout>
      <div className="absolute top-[5.5rem] right-10">
        <TableCreate />
      </div>

      <div className="ml-[17rem] mt-16 flex justify-start space-x-3">
        {validTables.map((item: tables) => (
          <Link key={item.id} href={`/admin/tables/${item.id}`}>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-[10rem] h-[7rem] cursor-pointer hover:bg-blue-gray-400 flex flex-col items-center justify-center bg-blue-gray-200 rounded-md">
                <h1>{item.name} Table</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Tables;
