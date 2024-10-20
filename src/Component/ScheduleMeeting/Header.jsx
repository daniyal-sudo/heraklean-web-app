import React, { useState, useEffect } from 'react';
import { HiBellAlert } from 'react-icons/hi2';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Header.css';

const Header = () => {
  const [notificationsActive, setNotificationsActive] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [query, setQuery] = useState(''); // Search query state
  const [searchResults, setSearchResults] = useState([]); // Search results state
  const [profilePic, setProfilePic] = useState(''); // State for profile picture
  const navigate = useNavigate(); // Use React Router's useNavigate for navigation

  // Route mapping based on search terms
  const routeMapping = {
    'home': '/',
    'dietplan': '/dietplan',
    'programplan': '/programplan',
    'profile': '/profile',
    'create-client': '/create-client',
    'calendar': '/schedule-meeting',
    'data': '/data',
    'createprogram': '/create-program',
    'creatediet': '/create-diet',
    'single-client': '/singleClient/:clientId'
  };

  // Fetch notifications from API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://82.112.240.94:5001/api/auth/notification', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success) {
          setNotifications(data.notifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const trainerId = localStorage.getItem('trainerId');
        const response = await fetch(`http://82.112.240.94:5001/api/auth/getinfo/${trainerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (data.success && data.profilePic) {
          // Fix the backslashes in the image path and prepend the base URL
          const fixedProfilePic = data.profilePic.replace(/\\/g, '/'); // Replace backslashes with forward slashes
          const imageUrl = `http://82.112.240.94:5001/${fixedProfilePic}`;
          
          setProfilePic(imageUrl); // Set the full URL for the profile image
          console.log(imageUrl); // Log the corrected image URL for debugging
        }
      } catch (error) {
        console.error('Error fetching profile image:', error);
      }
    };
  
    fetchProfile();
  }, []);

  // Handle search input changes
  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle search input on key press (Enter key)
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      const searchTerm = query.trim().toLowerCase();
      const route = routeMapping[searchTerm]; // Match query to route

      if (route) {
        navigate(route); // Navigate to the matched route
      } else {
        console.log('No matching route found.');
      }
    }
  };

  // Toggle notification dropdown
  const toggleNotifications = () => {
    setNotificationsActive(!notificationsActive);
  };

  return (
    <>
      <header className="header mt-3 my-2">
        <div className="header-content flex justify-between items-center">
          <div className="greeting mx-5 col-lg-4">
            <div className="search-bar-container">
              <div className="input-group">
                <input
                  type="text"
                  value={query} // Controlled input
                  onChange={handleSearchChange} // Handle search input change
                  onKeyPress={handleSearchKeyPress} // Handle search on Enter key press
                  className="form-control form-control-sm rounded-5 border-2 shadow-sm py-2"
                  placeholder="Search Here"
                  aria-label="Search"
                />
                <span className="input-group-text bg-white border-0 mx-2">
                  <FaSearch size={20} />
                </span>
              </div>
            </div>
          </div>

          <div className="notifications">
            <div className="icon_wrap" onClick={toggleNotifications}>
              <HiBellAlert size={28} className="text-2xl" />
              {notifications.length > 0 && (
                <span className="notification_badge">{notifications.length}</span>
              )}
            </div>

            {notificationsActive && (
              <div className="notification_dd">
                <ul className="notification_ul">
                  {notifications.map((notification, index) => (
                    <li key={index} className="success">
                      <div className="notify_icon">
                        <span className="icon success"></span>
                      </div>
                      <div className="notify_data">
                        <div className="title">{notification}</div>
                        <div className="sub_title">Some extra info here</div>
                      </div>
                    </li>
                  ))}
                  <li className="show_all">
                    <p className="link">Show All Activities</p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="profile-pic me-4 mx-2">
          <img
            src={profilePic || 'picture.png'} // Fallback image if no profilePic is available
            className="img-fluid rounded-circle"
            alt="Profile"
          />
        </div>
      </header>
    </>
  );
};

export default Header;
