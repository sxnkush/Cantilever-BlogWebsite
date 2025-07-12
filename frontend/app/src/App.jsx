import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Navigate, Route, Router, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BlogDetails from "./pages/BlogDetails";
import Layout from "./Layout";
import { useAuth } from "./context/AuthContext.jsx";

function App() {
  const {isAuthenticated, setIsAuthenticated} = useAuth()
  
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route element={<Layout />} >
      <Route
        path="/"
        element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/create"
        element={isAuthenticated ? <Create /> : <Navigate to="/login" />}
      />
      {/* <Route path="/connect" element={<Connect />} /> */}
      <Route
        path="/blog/:id"
        element={isAuthenticated ? <BlogDetails /> : <Navigate to="/login" />}
      />
      </Route>
    </Routes>
  );
}

export default App;
