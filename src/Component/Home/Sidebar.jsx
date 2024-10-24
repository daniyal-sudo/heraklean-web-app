import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // For hamburger icon
import "./Sidebar.css"; // Ensure CSS is imported
import SvgSelection from "../CommonComponent/SvgSelection";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility

  const navItems = [
    { name: "Home", image: "/dashboard (3) 1.png", path: "/" },
    { name: "Calendar", image: "/Vector.png", path: "/schedule-meeting" },
    { name: "Clients", image: "/mdi_users-outline.svg", path: "/Data" },
    { name: "Programs", image: "/entypo_list.png", path: "/programplan" },
    {
      name: "Diet Plans",
      image: "/fluent_channel-16-regular.png",
      path: "/dietplan",
    },
    { name: "Profile", image: "/pf.png", path: "/profile" },
  ];

  // Toggle function to open/close sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirect after logout
  };

  return (
    <>
      {/* Hamburger Button for Small Screens */}
      <button
        className="navbar-toggler display_class"
        type="button"
        onClick={toggleSidebar}
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <FaBars size={24} />
      </button>
      <div className="text-center display_class">
        <img
          src="/image 45.png"
          alt="logo"
          className="img-fluid side_logo_height_width"
        />
      </div>

      {/* Sidebar Navigation */}
      <nav className={`custom-sidebar ${isOpen ? "open" : ""}`}>
        {/* <div className="text-center">
          <img
            src="/image 45.png"
            alt="logo"
            className="img-fluid side_logo_height_width mt-3"
          />
        </div> */}

        <div className="d-flex flex-column align-items-center mt-5">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`nav-item d-flex flex-column align-items-center my-2 text-decoration-none ${
                location.pathname === item.path
                  ? "active py-2 px-4 rounded-3"
                  : ""
              }`}
            >
              {/* <img
								src={`${item.image}`}
								alt={`${item.name} icon`}
								style={{ width: "24px", height: "24px" }}
								className={location.pathname === item.path ? "text_nav_item" : "text-muted"}
							/> */}
              <SvgSelection
                width="30"
                height="30"
                fill={location.pathname === item.path ? " #53AFE6" : "#8F8F8F"}
                type={item.name}
                // Adjust fill color dynamically
              />
              <span
                className={`mt-1 small ${
                  location.pathname === item.path
                    ? "text_nav_item"
                    : "text-muted"
                }`}
				style={{color:location.pathname === item.path ? " #53AFE6" : "#8F8F8F"}}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Sign Out Button */}
        <div className="text text-center mt-5">
          <button className="btn" onClick={logout}>
            <span className="small fw-bold">
              Sign Out
              <i className="bi bi-arrow-right ps-2 arrow_icon mt-4"></i>
            </span>
          </button>
        </div>
      </nav>

      {/* Overlay for Small Screens */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
