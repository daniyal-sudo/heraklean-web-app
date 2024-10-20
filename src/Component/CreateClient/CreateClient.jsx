import React from 'react';
import Header from './../AllClients/Header';
import Sidebar from './../Home/Sidebar';
import './CreateClient.css';
import "./../Profile/Profile.css"
import Form from './Form';
function CreateClient() {
  return (
    <div className="home-container">
    <div className="d-flex">
      <Sidebar /> {/* Sidebar on the left */}
      <div className="content-wrapper d-flex flex-column">
        <Header /> 
 <Form />
      </div>
    </div>
  </div>
  );
}

export default CreateClient;