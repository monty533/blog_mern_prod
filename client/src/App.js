import React, { useContext, useEffect } from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/components/pages/Home";
import About from "../src/components/pages/About";
import Blogs from "../src/components/pages/Blogs";
import SingleBlog from "../src/components/pages/SingleBlog";
import Navbar from "../src/components/layout/Navbar";
import Footer from "../src/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/pages/Dashboard";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import AllAuthors from "./components/pages/AllAuthors";
import { Context } from "./index";
import axios from "axios";
import UpdateBlog from "./components/pages/UpdateBlog";

// This is whole website when on production on render
export const REACT_APP_URL = process.env.REACT_URL || "http://localhost:3000"
console.log('REACT_APP_URL:;',REACT_APP_URL)
export const BACKEND_APP_URL = process.env.BACKEND_URL || "http://localhost:4000"
// end
console.log('BACKEND_APP_URL', BACKEND_APP_URL);
const App = () => {
  const { setUser, setIsAuthenticated, setBlogs } =
    useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_APP_URL}/api/v1/user/myprofile`,
          {
            withCredentials: true,
          }
        );
        setUser(data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.log('error aaya h MY PROFILE ME', error);
        setIsAuthenticated(false);
        setUser({});
      }
    };
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_APP_URL}/api/v1/blog/all`,
          { withCredentials: true }
        );
        setBlogs(data.allBlogs);
      } catch (error) {
        setBlogs([]);
      }
    };
    fetchUser();
    fetchBlogs();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog/update/:id" element={<UpdateBlog />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;