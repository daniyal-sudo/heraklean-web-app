import React from 'react';
import Header from '../CommonComponent/Header';
import Sidebar from './../Home/Sidebar';
import './../CreateClient/CreateClient.css';
import DietData from './DietData';

function DietPlan() {
  return (
    <div className="home-container">
      <div className="d-flex">
        <Sidebar /> {/* Sidebar on the left */}
        <div className="content-wrapper d-flex flex-column">
          <Header />
     
      <DietData />
  
      </div>
    </div>
  </div>
  );
}

export default DietPlan;