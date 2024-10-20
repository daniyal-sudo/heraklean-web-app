import React from 'react';
import Header from './Header';
import "./Header.css"
import Sidebar from './../Home/Sidebar';
import './../CreateClient/CreateClient.css';
import Calendar from './Calendar'
import "./Calendar.css"

function ScheduleMeeting() {
  return (
    <div className="home-container">
    <div className="d-flex">
      <Sidebar /> 
      
      <div className="content-wrapper">
        <div className="header-fullwidth">
          <Header />
        </div>
        <Calendar />
      </div>
    </div>
  </div>
  );
}

export default ScheduleMeeting;