import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { api_url } from "../../../CommonFunctions";
import SearchBar from "./SearchBar";
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  const location = useLocation();

  const [trainerInfo, setTrainerInfo] = useState({
    profilePic: "",
    Fname: "",
    lastName: "",
    email: "",
  });
  const navigate = useNavigate();

  // Route mapping based on search terms
  const routeMapping = {
    home: "/",
    dietplan: "/dietplan",
    programplan: "/programplan",
    profile: "/profile",
    "create-client": "/create-client",
    calendar: "/schedule-meeting",
    data: "/data",
    createprogram: "/create-program",
    creatediet: "/create-diet",
    "single-client": "/singleClient/:clientId",
  };

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${api_url}notification`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Fetch profile picture
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const trainerId = localStorage.getItem("trainerId");
        const response = await fetch(
          `${api_url}getinfo/${trainerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.success && data.profilePic) {
          const fixedProfilePic = data.profilePic.replace(/\\/g, "/");
          const imageUrl = `http://82.112.240.94:5001/${fixedProfilePic}`;
          
        }
        // alert('')
        // console.log('response.data',data)
        setTrainerInfo(data);
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfile();
  }, []);

  // Toggle notification dropdown
  const toggleNotifications = () => {
    setNotificationsActive(!notificationsActive);
  };
console.log(location.pathname,'location.pathname')
  return (
    <>
      <header className="header">
        <div
          className="header-content"
          style={{
            justifyContent: window.innerWidth < 786 && "center",
          }}
        >
          {/* Greeting Section */}
          {window.innerWidth < 786 ? (
            <>
              <div>
                <img
                  src="/image 45.png"
                  alt="logo"
                  className="img-fluid side_logo_height_width "
                />
              </div>
            </>
          ) : (
            <div className="greeting">
              {location.pathname !== '/' ?
               <h5>Good Morning, {trainerInfo?.Fname && trainerInfo.Fname+ ' '+trainerInfo.lastName}</h5>
              :
              <SearchBar />}
            </div>
          )}
          {window.innerWidth > 786 && (
            <div className="header-top">
              {/* Notifications Section */}
              <div className="notifications">
                <div
                  className="notification-icon"
                  onClick={toggleNotifications}
                >
                  <i className="bi bi-bell"></i>
                  {notifications.length > 0 && (
                    <span className="notification-badge">
                      {notifications.length}
                    </span>
                  )}
                </div>
                {notificationsActive && (
                  <div className="notification-dropdown">
                    <ul>
                      {notifications?.length > 0 ? (
                        notifications.map((notification, index) => (
                          <li key={index}>
                           <div className="notification-section">
                            <div className="notification-content">
                                  <div className="notify-icon">
                                    <img src="/notification.png" alt="img"/>
                                  </div>
                                  <div className="notify-data">
                                    <p>{notification}</p>
                                  </div>
                                </div>
                                <div className="notification-buttons">
                                    <button className="accept-button">Accept</button>
                                    <button className="reject-button">Reject</button>
                                  </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <li className="show-all">
                          <p className="link">No notification found.</p>
                        </li>
                      )}
                      {/* <li className="show-all">
															<p className="link">Show All Notifications</p>
														</li> */}
                    </ul>
                  </div>
                )}
              </div>
              <div className="profile">
                <img src="picture.png" alt="Profile" className="profile-pic" />
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
