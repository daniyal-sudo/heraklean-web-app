import React from "react";
import Sidebar from "./../Home/Sidebar";
import "./CreateClient.css";
import "./../Profile/Profile.css";
import Form from "./Form";
import Header from "../CommonComponent/Header";
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
