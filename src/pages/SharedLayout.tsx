import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const SharedLayout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="container mx-auto px-2 lg:px-4">
        <Outlet />
      </main>
    </>
  );
};

export default SharedLayout;
