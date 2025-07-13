import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [warning, setWarning] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !pass) {
      setWarning(true);
      return;
    }
    setLoading(true);

    try {
      setTimeout(async () => {
        const response = await axios.post(
          `${BASE_URL}/api/user/login`,
          { email, password: pass },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data.message === "not found") {
          setIsAuthenticated(false);
          setWarning(true);
          setLoading(false);
          setPass("");
          return;
        }
        if (response.data.message === "Log In success") {
          setIsAuthenticated(true);
          navigate(`/`);
        }
        setEmail("");
        setPass("");
      }, 1500);
    } catch (error) {
      setIsAuthenticated(false);
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black flex items-center justify-center relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2 text-center">
          Sign In to Your Blog Account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Access your dashboard, write blogs, and connect with the community.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              type="password"
              placeholder="Enter Password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {warning && (
            <span className="text-sm text-red-600 block text-center -mt-3">
              Invalid Credentials
            </span>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-lg transition ${
              loading
                ? "bg-indigo-500/80 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600 cursor-pointer"
            } text-white`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-center mt-5">
          New here?{" "}
          <a href="/signup" className="text-indigo-600 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
