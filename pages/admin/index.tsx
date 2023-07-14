import { useEffect } from "react";

import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

import Layout from "@/components/Layout";

const AdminHome = () => {
  const { locations } = useAppSelector(appData);

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
