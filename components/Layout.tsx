import { ReactNode } from "react";
import NavBar from "./NavBar";
import { signOut } from "next-auth/react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: any) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
