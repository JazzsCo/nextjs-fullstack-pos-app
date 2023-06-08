import { AppContext } from "@/contexts/AppContext";
import { useContext } from "react";

export const LocationId = () =>
  typeof window !== "undefined" ? localStorage.getItem("locationId") : "";
