import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
	const [notificationsActive, setNotificationsActive] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [profilePic, setProfilePic] = useState("");
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
				const response = await fetch("http://82.112.240.94:5001/api/auth/notification", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
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
				const response = await fetch(`http://82.112.240.94:5001/api/auth/getinfo/${trainerId}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				const data = await response.json();
				if (data.success && data.profilePic) {
					const fixedProfilePic = data.profilePic.replace(/\\/g, "/");
					const imageUrl = `http://82.112.240.94:5001/${fixedProfilePic}`;
					setProfilePic(imageUrl);
				}
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

	return (
		<>
			<header className="header hide-class">
				<div className="header-content">
							{/* Greeting Section */}
						<div className="greeting">
							<h5>Good Morning, Afnan Ali</h5>
						</div>
						<div className="header-top">
										{/* Notifications Section */}
										<div className="notifications">
											<div className="notification-icon" onClick={toggleNotifications}>
												<i className="bi bi-bell"></i>
												{notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
											</div>
											{notificationsActive && (
												<div className="notification-dropdown">
													<ul>
														{notifications?.length > 0 ? notifications.map((notification, index) => (
															<li key={index}>
																<div className="notify-icon">
																	<span className="icon success"></span>
																</div>
																<div className="notify-data">
																	<p>{notification}</p>
																</div>
															</li>
														)):
														 <li className="show-all"
														>
															<p className="link">No notification found.</p>
														</li> 
														}
														{/* <li className="show-all">
															<p className="link">Show All Notifications</p>
														</li> */}
													</ul>
												</div>
											)}
										</div>
										{/* Profile Section */}
										<div className="profile">
											<img src="picture.png" alt="Profile" className="profile-pic" />
										</div>
						</div>
				</div>
			</header>
		</>
	);
};

export default Header;
