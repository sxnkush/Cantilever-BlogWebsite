import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronRight, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";

export default function Navbar() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [showLogout, setShowLogout] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/user`, {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        if (err.response?.status === 401 || err.response?.data.message === "unauthorized") {
          navigate("/login");
        } else {
          console.log("Error in frontend user fetch", err);
        }
      }
    };
    fetchUser();
  }, []);

  const navLinks = [
    { to: "/", name: "Home" },
    { to: "/create", name: "Create" },
    { to: "/connect", name: "Connect" },
    { to: "/myblog", name: "My Blogs" },
  ];

  return (
    <div className="flex justify-between items-center px-6 md:px-16 py-3 bg-black text-white shadow-lg relative">
      {/* Logo or Brand */}
      <div className="text-xl font-bold">BlogApp</div>

      {/* Desktop Menu */}
      <div className="hidden sm:flex space-x-10">
        {navLinks.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) =>
              `relative pb-1 font-semibold transition-all duration-200 ${
                isActive ? "text-white after:w-full" : "text-gray-400 after:w-0"
              } after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-white hover:after:w-full after:transition-all`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Mobile Menu Icon */}
      <div className="sm:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* User Profile Dropdown */}
      <div className="hidden sm:block relative">
        <button
          className="flex items-center gap-3 focus:outline-none hover:cursor-pointer"
          onClick={() => {
            setShowLogout((prev) => !prev);
            setArrowDown((prev) => !prev);
          }}
        >
          <img
            src="/User.png"
            alt="User"
            className="w-12 h-12 rounded-full border-2 border-gray-600 object-cover"
          />
          <div className="flex flex-col text-left truncate">
            <p className="font-medium truncate">{user?.name || "Loading..."}</p>
          </div>
          {arrowDown ? <FaChevronDown /> : <FaChevronRight />}
        </button>

        {showLogout && (
          <div className="absolute right-0 top-16 bg-white text-black shadow-xl p-4 rounded-lg text-sm w-56 space-y-4 z-50">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-gray-600" />
              <span className="truncate">{user?.email || "Loading..."}</span>
            </div>
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md shadow-sm transition-all hover:cursor-pointer"
              onClick={async () => {
                await axios.post(`${BASE_URL}/api/user/logout`, {}, { withCredentials: true });
                navigate("/login");
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-black flex flex-col items-center space-y-4 py-4 z-40">
          {navLinks.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `font-semibold ${isActive ? "text-white" : "text-gray-400"}`
              }
            >
              {item.name}
            </NavLink>
          ))}

          <div className="flex flex-col items-center space-y-2">
            <p className="text-white font-medium">{user?.name || "Loading..."}</p>
            <p className="text-sm text-gray-400">{user?.email || "Loading..."}</p>
            <button
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md shadow-sm transition-all"
              onClick={async () => {
                await axios.post(`${BASE_URL}/api/user/logout`, {}, { withCredentials: true });
                navigate("/login");
              }}
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
