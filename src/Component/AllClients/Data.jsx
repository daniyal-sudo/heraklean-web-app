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


<div className={`container-fluid home-container full_page_height ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
			<div className="row">
				<div className="col-lg-2 col-12 px-0 side_content"> 
					<Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
				</div>
				<div className="col-lg-10 col-12 px-0 profile_content" style={{ background: '#F8F6FB' }}>
					<div className="content-wrapper">
						<Header toggleSidebar={toggleSidebar} />
						<AllClients />
					</div>
				</div>
			</div>
		</div>











  );
}

export default Data;