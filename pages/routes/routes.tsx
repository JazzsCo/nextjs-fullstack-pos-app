import Link from "next/link";
import { Button } from "@mui/material";

const Routes = () => {
  return (
    <div className="flex flex-row justify-center mt-10">
      <Button variant="outlined" sx={{ m: 1 }}>
        <Link href="/components/menus">menus</Link>
      </Button>
      <Button variant="outlined" sx={{ m: 1 }}>
        <Link href={"/components/menu-categories"}>menu categories</Link>
      </Button>
      <Button variant="outlined" sx={{ m: 1 }}>
        <Link href={"/components/addon"}>addons</Link>
      </Button>
      <Button variant="outlined" sx={{ m: 1 }}>
        <Link href={"/components/addon-categories"}>addon categories</Link>
      </Button>
    </div>
  );
};

export default Routes;
