import React, { useState } from "react";
import Header from '../CommonComponent/Header';
import Sidebar from "./Sidebar";
import ClientProfile from "./ClientProfile";
import "./Home.css"; // Ensure correct path

const Home = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Control sidebar state

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	return (
		<div className="home-container">
    <div className="d-flex">
				<div className="side_content"> 
					<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				</div>
				<div className="content-wrapper d-flex flex-column">
						<Header />
						<ClientProfile />
						</div>
    </div>
  </div>
			
		
	);
};

export default Home;
