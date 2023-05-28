import { ReactNode } from "react";
import NavBar from "./NavBar";
import { signOut } from "next-auth/react";
import { Button } from "@mui/material";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: any) => {
  return (
    <div>
      <NavBar />
      <Button variant="outlined" onClick={() => signOut()}>
        Sign out
      </Button>
      {children}
    </div>
  );
};

export default Layout;
