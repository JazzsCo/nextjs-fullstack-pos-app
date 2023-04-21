import NavBar from "./NavBar";

interface Props {
  children: string | JSX.Element | JSX.Element[];
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
