import React, { useState } from "react";
import Header from "../CommonComponent/Header";
import Sidebar from "./Sidebar";
import ClientProfile from "./ClientProfile";
import "./Home.css"; // Ensure correct path

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Control sidebar state
  const [searchTerm, setSearchTerm] = useState(''); // Control sidebar state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="home-container">
      <div className="d-flex">
        <div className="side_content">
          <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </div>
        <div className="content-wrapper d-flex flex-column">
          <Header handleSearch={handleSearch} />
          <ClientProfile searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default Home;
