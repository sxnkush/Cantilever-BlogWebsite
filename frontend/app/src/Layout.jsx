import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <Navbar />
      <Outlet />
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
