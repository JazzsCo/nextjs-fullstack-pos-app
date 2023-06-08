import { ReactNode } from "react";
import NavBar from "./NavBar";
import { signOut } from "next-auth/react";
import SideBar from "./SideBar";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <NavBar />
      <SideBar />
      {children}
    </div>
  );
};

export default Layout;
