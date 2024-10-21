import React from 'react';
import Header from '../CommonComponent/Header';
import Sidebar from './../Home/Sidebar';
import './../CreateClient/CreateClient.css';
import ProgramData from './ProgramData';
function ProgramPlan() {
  return (
    <div className="home-container">
    <div className="d-flex">
      <Sidebar /> {/* Sidebar on the left */}
      <div className="content-wrapper d-flex flex-column">
        <Header />   
        
        <ProgramData />
      </div>
    </div>
  </div>
  );
}

export default ProgramPlan;