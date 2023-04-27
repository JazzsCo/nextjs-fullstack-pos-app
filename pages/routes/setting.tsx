import { useContext } from "react";
import Layout from "../components/Layout";
import { AppContext } from "../contexts/AppContext";
import { Box, Button } from "@mui/material";

const Setting = () => {
  const { locations } = useContext(AppContext);

  return (
    <Layout>
      <h1>hello</h1>
    </Layout>
  );
};

export default Setting;
