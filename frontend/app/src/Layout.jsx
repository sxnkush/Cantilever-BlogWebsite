import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Layout() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gradient-to-b from-white via-gray-150 to-gray-100 text-black">
      <Navbar />
      <Outlet />
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
}
