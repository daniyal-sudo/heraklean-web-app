import React, { useState } from "react";
import Header from './Header';
import Sidebar from './../Home/Sidebar';
import './../CreateClient/CreateClient.css';
import AllClients from './AllClients';
function Data() {
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Control sidebar state

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};
  return (
//     <div className="home-container">
//     <div className="d-flex">
//       <Sidebar />
//       <div className="content-wrapper d-flex flex-column">
//         <Header /> 
      
//         <AllClients />
     
//   </div>
// </div>
//     </div>


<div className="home-container">
<div className="d-flex">
					<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

			   <div className="content-wrapper">
        <div className="header-fullwidth">
						<Header toggleSidebar={toggleSidebar} />
						</div>
						<AllClients />
						</div>
    </div>
  </div>











  );
}

export default Data;