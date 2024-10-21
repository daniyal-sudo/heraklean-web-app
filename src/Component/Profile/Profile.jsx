import React from 'react';
import Header from './../AllClients/Header';
import Sidebar from './../Home/Sidebar';
import './../CreateClient/CreateClient.css';
import ProfileData from './ProfileData';

function Profile() {

  return (
    <div className="home-container">
    <div className="d-flex">
      <Sidebar />
      
      <div className="content-wrapper">
        <div className="header-fullwidth">
          <Header />
        </div>
        <ProfileData />
      </div>
    </div>
  </div>
  );
}
export default Profile;
