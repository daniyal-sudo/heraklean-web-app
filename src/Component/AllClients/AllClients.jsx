import React, { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import SingleClient from "./SingleClient";
import axios from "axios";
const Card = ({ name, city, imgSrc, clientId }) => {
	// Assuming your backend serves images from a folder like 'http://localhost:5001/uploads/'
	const imageUrl = imgSrc ? `http://82.112.240.94:5001/${imgSrc.replace(/\\/g, "/")}` : "default_image.png";

	return (
		<div className="col-lg-12 mb-4">
			<div className="row align-items-center p-3 rounded" style={{ border: "1px solid #E5E5E5" }}>
				{/* Image Section */}
				<div className="col-auto">
					<img
						src={imageUrl}
						alt={name}
						className="rounded"
						style={{ width: "50px", height: "50px", objectFit: "cover" }}
						onError={(e) => {
							e.target.onerror = null; // Prevent infinite loop
							e.target.src = ""; // Set an empty string or default image if needed
							e.target.alt = "Profile"; // Fallback to "Profile"
						}}
					/>
				</div>

				{/* Name and City Section */}
				<div className="col">
					<h6 className="mb-0" style={{ fontWeight: "bold", fontSize: "16px" }}>
						{name.length > 8 ? name.slice(0, 8) + "..." : name}
					</h6>
					<div className="d-flex align-items-center text-muted mt-1">
						<span style={{ fontSize: "14px" }}>{city}</span>
					</div>
				</div>

				{/* Notification Badge Section */}
				<div className="col-auto">
					<div
						className="notification_badge_icon_padding"
						style={{
							background: "rgba(83, 175, 230, 0.31)",
							position: "relative",
							borderRadius: "50%",
						}}
					>
						<div className="icon_wrap">
							<i className="bi bi-bell text-2xl"></i>
							<span
								className="notification_badge"
								style={{
									background: "#53AFE6",
									position: "absolute",
									top: "0",
									right: "0",
								}}
							></span>
						</div>
					</div>
				</div>

				{/* Link Section */}
				<div className="col-auto">
					<Link to={`/SingleClient/${clientId}`}>
						<FaChevronRight size={18} style={{ color: "#BDBDBD" }} />
					</Link>
				</div>
			</div>
		</div>
	);
};

const AllClients = () => {
	const [clients, setClients] = useState([]);

	useEffect(() => {
		const fetchClients = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get("http://82.112.240.94:5001/api/auth/getTrainerClients", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});
				if (response.data.success) {
					setClients(response.data.clients);
					console.log(response.data.clients);
				}
			} catch (error) {
				console.error("Error fetching clients:", error);
			}
		};

		fetchClients();
	}, []);

	// const clients = [
	//   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
	//   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
	//   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
	//   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
	//   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
	//   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
	//   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
	//   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
	//   { name: 'Kathryn Murphy', city:"New York, USA", imgSrc: 'pic.png' },
	// ];
	return (
		<>
			<div className="container my-4 clinet_height">
				<div className="row">
					<div className="col-lg-10 p-3 bg-white rounded-3">
						<div className="row">
							<div className="col-lg-3">
								<h4 className="mb-4 small fs-5 upcoming_border-line" style={{ fontWeight: "bold" }}>
									All Clients
								</h4>
							</div>
							<div className="col-lg-5">
								<div className="text-start mb-4">
									<Link
										to="/create-client"
										className="btn px-3 py-2"
										style={{ backgroundColor: "#53AFE6", color: "#FFFFFF" }}
									>
										Create New
									</Link>
								</div>
							</div>
							<div className="greeting col-lg-4">
								<div className="search-bar-container mb-4">
									<div className="input-group position-relative">
										<div className="search-line"></div> {/* New element for the line */}
										<input
											type="text"
											className="form-control form-control-sm rounded-5 border-2 shadow-sm py-2 pe-5 search-input search_padding"
											placeholder="Search Here"
											aria-label="Search"
										/>
									</div>
								</div>
							</div>
						</div>
						<div className="row">
							{clients.map((client) => (
								<div className="col-lg-5">
									<Card
										key={client._id}
										name={client.fullname}
										city={client.city || "Unknown"} // Assuming city is not available in API response
										imgSrc={client.profilePic || "pic.png"}
										clientId={client._id}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AllClients;
