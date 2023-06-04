import Layout from "@/components/Layout";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import React, { useContext, useEffect } from "react";

const AdminHome = () => {
  const { locations, updateData, ...data } = useContext(AppContext);

  const getDataByLocationId = async (id: number) => {
    const url = `/api/getAllData?id=${id}`;

    const res = await axios.get(url);
    console.log("get data by location id : ", res);
    const { menuCategories, addonCategories } = res.data;

    updateData({ ...data, menuCategories, addonCategories });
  };

  useEffect(() => {
    if (locations.length) {
      const locationId = localStorage.getItem("locationId");

      if (!locationId) {
        const currentLocationId = locations[0].id;
        localStorage.setItem("locationId", String(currentLocationId));
        getDataByLocationId(currentLocationId);
      } else {
        // main point ***
        getDataByLocationId(Number(locationId));
      }
    }
  }, [locations]);

  return <Layout />;
};

export default AdminHome;
