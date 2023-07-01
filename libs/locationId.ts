export const LocationId = () =>
  typeof window !== "undefined" ? localStorage.getItem("locationId") : "";
