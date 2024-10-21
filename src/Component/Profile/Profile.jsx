import React from 'react';
import Header from './../AllClients/Header';
import Sidebar from './../Home/Sidebar';
import './../CreateClient/CreateClient.css';
import ProfileData from './ProfileData';
import './Profile.css';

function Profile() {

  return (
    <div className="home-container">
    <div className="d-flex">
      <Sidebar /> {/* Sidebar on the left */}
      
      <div className="content-wrapper">
        <div className="header-fullwidth"> {/* Make header full width */}
          <Header />
        </div>
        <ProfileData />
      </div>
    </div>
  </div>
  );
}
export default Profile;
