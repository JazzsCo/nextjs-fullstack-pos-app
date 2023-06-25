import Layout from "@/components/Layout";
import { AdminContext } from "@/contexts/AdminContext";
import axios from "axios";
import React, { useContext, useEffect } from "react";

const AdminHome = () => {
  const { locations } = useContext(AdminContext);

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
