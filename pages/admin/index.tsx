import Layout from "@/components/Layout";
import { AppContext } from "@/contexts/AppContext";
import axios from "axios";
import React, { useContext, useEffect } from "react";

const AdminHome = () => {
  const { locations, updateData, ...data } = useContext(AppContext);

  useEffect(() => {
    if (locations.length) {
      const locationId = localStorage.getItem("locationId");

      if (!locationId) {
        const currentLocationId = locations[0].id;
        localStorage.setItem("locationId", String(currentLocationId));
      }
    }
  }, [locations]);

  return <Layout />;
};

export default AdminHome;
