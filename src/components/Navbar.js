import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className={`shadow-lg fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
      darkMode ? "bg-gray-900" : "bg-gradient-to-r from-indigo-500 via-purple-600 to-blue-500"
    }`}>
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          Quiz<span className="text-yellow-400">Master</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/categories"
            className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
          >
            Categories
          </Link>
          <Link
            to="/about"
            className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-white text-base font-medium hover:text-yellow-400 transition duration-300"
          >
            Contact
          </Link>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/30 hover:scale-110 transition-transform duration-300 text-white text-2xl shadow-md"
          >
            {darkMode ? <MdLightMode className="text-yellow-400 transition-all duration-300" /> : <MdDarkMode className="text-gray-300 transition-all duration-300" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-700 dark:bg-gray-800 text-white">
          <div className="flex flex-col space-y-2 py-4 px-6">
            <Link
              to="/"
              className="hover:text-yellow-400 text-sm font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/categories"
              className="hover:text-yellow-400 text-sm font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/about"
              className="hover:text-yellow-400 text-sm font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-yellow-400 text-sm font-medium transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;