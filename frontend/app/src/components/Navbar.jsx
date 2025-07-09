import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaChevronDown, FaChevronRight, FaEnvelope } from "react-icons/fa";

export default function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  return (
    <div className="flex justify-between px-16 py-2 shadow-xl w-screen">
      <div className="space-x-8 mt-2.5 ml-24">
        {[
          { to: "/", name: "Home" },
          { to: "/create", name: "Create" },
          { to: "/connect", name: "Connect" },
        ].map((item, idx) => (
          <NavLink
            key={idx}
            to={item.to}
            className={({ isActive }) =>
              `${
                isActive ? "text-black underline" : "text-gray-500"
              } font-semibold`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <div className="relative">
        <button
          className="flex items-center gap-3 w-full focus:outline-none cursor-pointer"
          onClick={() => {
            setShowLogout((prev) => !prev);
            setArrowDown((prev) => !prev);
          }}
        >
          <img
            src={"/User.png"}
            alt="User"
            className="w-12 h-12 rounded-full border-2 border-[#474d4e]"
          />
          <div className="flex flex-col text-left truncate">
            <p className="font-medium truncate">{"Loading..."}</p>
          </div>
          {arrowDown ? (
            <FaChevronDown className="ml-auto" />
          ) : (
            <FaChevronRight className="ml-auto" />
          )}
        </button>
        {showLogout && (
          <div className="absolute top-16 bg-white shadow-lg p-4 rounded-lg text-sm space-y-4">
            <div className="flex items-center gap-2">
              <FaEnvelope />
              <span>{"Loading..."}</span>
            </div>
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md cursor-pointer"
              onClick={async () => {
                await axios.post(`${BASE_URL}/api/user/logout`, {
                  withCredentials: true,
                });
                navigate("/login");
              }}
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
