import { useContext } from "react";
import Layout from "../components/Layout";
import { AppContext } from "../contexts/AppContext";
import { Box, Button } from "@mui/material";
import axios from "axios";

const Setting = () => {
  const { locations } = useContext(AppContext);

  const handleClick = async (id: any) => {
    await axios
      .get(`/api/menusPost?id=${id}`)
      .then((res) => {
        console.log(res.data);
        return res;
      })
      .catch((err) => {
        return err;
      });
  };

  return (
    <Layout>
      <div className="w-full flex flex-col items-center space-y-4 my-52">
        {locations.map((location) => (
          <Button
            key={location.id}
            variant="outlined"
            onClick={() => handleClick(location.id)}
          >
            {location.name}
          </Button>
        ))}
      </div>
    </Layout>
  );
};

export default Setting;
