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

    console.log("Hello ma ma ");
    console.log("ma ma ko chit tl ");
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

// -- UPDATE menus_order SET name='ABC', price=200, is_avilable='true'
// -- WHERE id=10

// -- ALTER TABLE location_menus
// -- ADD COLUMN "is_available"
// -- BOOLEAN DEFAULT TRUE

// select menus.name,
// price, is_available, locations.name from menus
// inner join location_menus on location_menus.menu_id = menus.id
// inner join locations on locations.id=location_menus.location_id
// where locations.id=2
