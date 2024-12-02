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
        <svg
          width="42"
          height="43"
          viewBox="0 0 42 43"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7 11.1396C7 10.6755 7.18437 10.2304 7.51256 9.90221C7.84075 9.57402 8.28587 9.38965 8.75 9.38965H33.25C33.7141 9.38965 34.1593 9.57402 34.4874 9.90221C34.8156 10.2304 35 10.6755 35 11.1396C35 11.6038 34.8156 12.0489 34.4874 12.3771C34.1593 12.7053 33.7141 12.8896 33.25 12.8896H8.75C8.28587 12.8896 7.84075 12.7053 7.51256 12.3771C7.18437 12.0489 7 11.6038 7 11.1396ZM7 32.1396C7 31.6755 7.18437 31.2304 7.51256 30.9022C7.84075 30.574 8.28587 30.3896 8.75 30.3896H33.25C33.7141 30.3896 34.1593 30.574 34.4874 30.9022C34.8156 31.2304 35 31.6755 35 32.1396C35 32.6038 34.8156 33.0489 34.4874 33.3771C34.1593 33.7053 33.7141 33.8896 33.25 33.8896H8.75C8.28587 33.8896 7.84075 33.7053 7.51256 33.3771C7.18437 33.0489 7 32.6038 7 32.1396ZM8.75 19.8896C8.28587 19.8896 7.84075 20.074 7.51256 20.4022C7.18437 20.7304 7 21.1755 7 21.6396C7 22.1038 7.18437 22.5489 7.51256 22.8771C7.84075 23.2053 8.28587 23.3896 8.75 23.3896H22.75C23.2141 23.3896 23.6592 23.2053 23.9874 22.8771C24.3156 22.5489 24.5 22.1038 24.5 21.6396C24.5 21.1755 24.3156 20.7304 23.9874 20.4022C23.6592 20.074 23.2141 19.8896 22.75 19.8896H8.75Z"
            fill="black"
          />
        </svg>
      </button>
      {/* <div className="text-center logo-design">
        <img
          src="/image 45.png"
          alt="logo"
          className="img-fluid side_logo_height_width"
        />
      </div> */}

      {/* Sidebar Navigation */}
      <nav
        className={`custom-sidebar ${isOpen ? "open" : ""}`}
        // style={{
        //   background:'white'
        // }}
      >
        <div className="text-center d-flex flex-row align-items-center justify-content-between">
          <img
            src="/image 45.png"
            alt="logo"
            className="img-fluid side_logo_height_width"
          />
<button
className="hamid-icon"
      type="button"
      aria-label="Close"
      style={{
        background: 'none',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        position: 'relative',
        right: '-12px',
        top: '-12px',
        display: "none"
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-x"
        viewBox="0 0 16 16"
        stroke="currentColor"
        strokeWidth="1"
      >
    <path
      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
    />
  </svg>
</button>


        </div>

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
                style={{
                  color:
                    location.pathname === item.path ? " #53AFE6" : "#8F8F8F",
                }}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Sign Out Button */}
        <div className="text text-center mt-5 signout">
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
