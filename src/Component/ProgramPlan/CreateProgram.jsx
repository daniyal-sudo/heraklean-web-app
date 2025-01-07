import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./../Home/Sidebar";
import "./../CreateClient/CreateClient.css";
import { Modal, Button, Form } from "react-bootstrap";
import Header from "../CommonComponent/Header";
import CommonForm from "../ProgramPlan/CommonFrom";
import { errorMessage, successMessage } from "../../Toast/Toast";
import WorkOut from "./WorkOut";

const CreateProgram = ({ onClose,setShowComponent,setDayForm,dayForm}) => {
  const [programTitle, setProgramTitle] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [dayDetails, setDayDetails] = useState({
   
  });
  const [dayModal, setDayModal] = useState(false);


  // const [showComponent, setShowComponent] = useState("");

  // Add missing state for the day form
  

 

  // Close modal
  const handleClose = () => setDayModal(false);

  // Handle input changes for the day form
  const handleDayFormChange = (e) => {
    const { name, value } = e.target;

    setDayForm({
      ...dayForm,
      [name]: value,
    });
  };

  // Handle save day details
  const handleSaveDayDetails = () => {
    setDayDetails((prevDetails) => ({
      ...prevDetails,
      [selectedDay]: { ...dayForm }, // Save form data for the selected day
    }));
    handleClose();
  };

  const isFormValid = (form) => {
    return form.title.trim() !== ""; // Only validate title field
  };
  
  // Usage Example
  const validateForm = () => {
   console.log(isFormValid(dayForm))
   console.log(dayForm)
    if (isFormValid(dayForm)) {
      setShowComponent("showWorkout");
    } else {
      errorMessage('Program title is required')
      // Handle validation error
    }
  };
  

  return (
    <>
     
        <div className="container" style={{ height: "100dvh", padding: "30px 15px" }}>
          <div className="diet-plan-section-page">
            <CommonForm
              handleSubmit={validateForm}
              onClose={onClose}
              setSelectedDay={setSelectedDay}
              selectedDay={selectedDay}
              handleDayFormChange={handleDayFormChange}
              setDayForm={setDayForm}
              dayForm={dayForm}
              handleSaveDayDetails={handleSaveDayDetails}
              setProgramTitle={setProgramTitle}
              programTitle={programTitle}
              setShowComponent={setShowComponent}
            />
           
          </div>
        </div>
  

    
    </>
  );
};

export default CreateProgram;
