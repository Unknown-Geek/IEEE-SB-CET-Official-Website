import React, { useState, useEffect, useRef } from "react";
import { MenuIcon, XIcon, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

const logo = "/ieee-sb-logo.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="IEEE Logo" className="h-12" />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-8 items-center">
            <li>
              <Link to="/#home" className="text-gray-800 hover:text-[#006699] font-medium">
                Home
              </Link>
            </li>
            <li>
              <Link to="/#about" className="text-gray-800 hover:text-[#006699] font-medium">
                About
              </Link>
            </li>
            <li>
              <Link to="/#events" className="text-gray-800 hover:text-[#006699] font-medium">
                Events
              </Link>
            </li>
            <li>
              <Link to="/execom" className="text-gray-800 hover:text-[#006699] font-medium">
                Execom
              </Link>
            </li>
            <li>
              <Link to="/#membership" className="text-gray-800 hover:text-[#006699] font-medium">
                Membership
              </Link>
            </li>
            <li>
              <Link to="/#contact" className="text-gray-800 hover:text-[#006699] font-medium">
                Contact
              </Link>
            </li>

            {/* Dropdown */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-800 hover:text-[#006699] font-medium focus:outline-none"
              >
                Societies
                <ChevronDown
                  className={`ml-1 w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <ul className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg">
                  <li>
                    <Link
                      to="/society/ras"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      RAS
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/society/pes"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      PES
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/society/cs"
                      className="block px-4 py-2 hover:bg-gray-100 text-gray-800"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      CS
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white border-t">
          <ul className="flex flex-col py-2">
            {[
              ["Home", "/#home"],
              ["About", "/#about"],
              ["Events", "/#events"],
              ["Execom", "/execom"],
              ["Membership", "/#membership"],
              ["Contact", "/#contact"],
            ].map(([label, path]) => (
              <li key={label}>
                <Link
                  to={path}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              </li>
            ))}

            {/* Mobile Dropdown */}
            <li className="border-t">
              <button
                className="w-full text-left px-4 py-2 flex justify-between items-center hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Societies
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <ul className="bg-gray-50">
                  {[
                    ["RAS", "/society/ras"],
                    ["PES", "/society/pes"],
                    ["CS", "/society/cs"],
                  ].map(([label, path]) => (
                    <li key={label}>
                      <Link
                        to={path}
                        className="block px-6 py-2 hover:bg-gray-100 text-gray-800"
                        onClick={() => {
                          setIsMenuOpen(false);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
